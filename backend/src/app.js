import "dotenv/config";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { pathToFileURL } from "node:url";
import generateQR from "./example.js";

const app = express();
const isProduction = process.env.NODE_ENV === "production";
const PORT = Number.parseInt(process.env.PORT ?? "3000", 10);
const MAX_QR_TEXT_LENGTH = Number.parseInt(
  process.env.MAX_QR_TEXT_LENGTH ?? "1024",
  10,
);
const MAX_WHATSAPP_MESSAGE_LENGTH = Number.parseInt(
  process.env.MAX_WHATSAPP_MESSAGE_LENGTH ?? "500",
  10,
);
const RATE_LIMIT_WINDOW_MS = Number.parseInt(
  process.env.RATE_LIMIT_WINDOW_MS ?? "60000",
  10,
);
const RATE_LIMIT_MAX_REQUESTS = Number.parseInt(
  process.env.RATE_LIMIT_MAX_REQUESTS ?? "60",
  10,
);
const allowedOrigins = (process.env.CORS_ORIGINS ?? "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (
  Number.isInteger(Number.parseInt(process.env.TRUST_PROXY ?? "", 10)) ||
  process.env.TRUST_PROXY === "true"
) {
  app.set(
    "trust proxy",
    process.env.TRUST_PROXY === "true"
      ? true
      : Number.parseInt(process.env.TRUST_PROXY, 10),
  );
}

app.disable("x-powered-by");

function createHttpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function setSecurityHeaders(req, res, next) {
  res.setHeader("Content-Security-Policy", "default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Permissions-Policy", "camera=(), geolocation=(), microphone=()");

  if (req.secure) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
    );
  }

  next();
}

function createRateLimiter({ windowMs, maxRequests }) {
  const requests = new Map();

  setInterval(() => {
    const now = Date.now();

    for (const [ip, entry] of requests.entries()) {
      if (entry.resetAt <= now) {
        requests.delete(ip);
      }
    }
  }, windowMs).unref();

  return (req, res, next) => {
    const now = Date.now();
    const ip = req.ip ?? req.socket.remoteAddress ?? "unknown";
    const current = requests.get(ip);

    if (!current || current.resetAt <= now) {
      requests.set(ip, {
        count: 1,
        resetAt: now + windowMs,
      });
      res.setHeader("X-RateLimit-Limit", maxRequests);
      res.setHeader("X-RateLimit-Remaining", maxRequests - 1);
      return next();
    }

    current.count += 1;
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((current.resetAt - now) / 1000),
    );

    res.setHeader("X-RateLimit-Limit", maxRequests);
    res.setHeader(
      "X-RateLimit-Remaining",
      Math.max(0, maxRequests - current.count),
    );

    if (current.count > maxRequests) {
      res.setHeader("Retry-After", retryAfterSeconds);
      return next(
        createHttpError(
          429,
          "Demasiadas solicitudes. Intenta nuevamente en unos segundos.",
        ),
      );
    }

    return next();
  };
}

function validateURL(value) {
  try {
    const parsedUrl = new URL(value);
    return ["http:", "https:"].includes(parsedUrl.protocol);
  } catch {
    return false;
  }
}

function requireString(value, fieldName, { maxLength, optional = false } = {}) {
  if (value == null || value === "") {
    if (optional) {
      return "";
    }

    throw createHttpError(400, `El campo "${fieldName}" es obligatorio.`);
  }

  if (typeof value !== "string") {
    throw createHttpError(400, `El campo "${fieldName}" debe ser texto.`);
  }

  const normalized = value.trim();

  if (!normalized && !optional) {
    throw createHttpError(400, `El campo "${fieldName}" es obligatorio.`);
  }

  if (maxLength && normalized.length > maxLength) {
    throw createHttpError(
      400,
      `El campo "${fieldName}" supera el limite de ${maxLength} caracteres.`,
    );
  }

  return normalized;
}

function validateQrQuery(req, _res, next) {
  try {
    const hasText = req.query.text != null;
    const hasUrl = req.query.url != null;

    if (hasText === hasUrl) {
      throw createHttpError(
        400,
        'Debes enviar solo uno de estos parametros: "text" o "url".',
      );
    }

    if (hasText) {
      req.validatedInput = requireString(req.query.text, "text", {
        maxLength: MAX_QR_TEXT_LENGTH,
      });
      return next();
    }

    const url = requireString(req.query.url, "url", {
      maxLength: MAX_QR_TEXT_LENGTH,
    });

    if (!validateURL(url)) {
      throw createHttpError(400, "La URL debe usar http o https.");
    }

    req.validatedInput = url;
    return next();
  } catch (error) {
    return next(error);
  }
}

function validateWhatsappBody(req, _res, next) {
  try {
    const numberPhone = requireString(req.body?.numberPhone, "numberPhone", {
      maxLength: 15,
    });
    const message = requireString(req.body?.message, "message", {
      maxLength: MAX_WHATSAPP_MESSAGE_LENGTH,
      optional: true,
    });

    if (!/^\d{8,15}$/.test(numberPhone)) {
      throw createHttpError(
        400,
        'El campo "numberPhone" debe contener solo digitos y entre 8 y 15 caracteres.',
      );
    }

    req.validatedWhatsapp = {
      numberPhone,
      message,
    };
    return next();
  } catch (error) {
    return next(error);
  }
}

app.use(setSecurityHeaders);
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(createHttpError(403, "Origen no permitido por CORS."));
    },
    methods: ["GET", "POST"],
    optionsSuccessStatus: 204,
  }),
);
app.use(
  morgan(isProduction ? "combined" : "dev", {
    skip: (req) => req.path === "/health",
  }),
);
app.use(express.json({ limit: "10kb", strict: true, type: "application/json" }));
app.use(
  createRateLimiter({
    windowMs: RATE_LIMIT_WINDOW_MS,
    maxRequests: RATE_LIMIT_MAX_REQUESTS,
  }),
);

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/qr", validateQrQuery, async (req, res, next) => {
  try {
    const qrBase64 = await generateQR(req.validatedInput);

    return res.json({
      ok: true,
      qr: qrBase64,
    });
  } catch (error) {
    return next(error);
  }
});

app.post("/qr-whatsapp", validateWhatsappBody, async (req, res, next) => {
  try {
    const { numberPhone, message } = req.validatedWhatsapp;
    const text = message || "Te comparto este enlace:";
    const whatsappLink = `https://wa.me/${numberPhone}?text=${encodeURIComponent(
      text,
    )}`;
    const qrBase64 = await generateQR(whatsappLink);

    return res.json({
      ok: true,
      qr: qrBase64,
      message: text,
      whatsappLink,
    });
  } catch (error) {
    return next(error);
  }
});

app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
  });
});

app.use((error, req, res, _next) => {
  const status = Number.isInteger(error?.status) ? error.status : 500;

  if (status >= 500) {
    console.error(
      `[${new Date().toISOString()}] Error interno en ${req.method} ${req.originalUrl}`,
      error,
    );
  }

  res.status(status).json({
    error: status >= 500 ? "Error interno del servidor" : error.message,
  });
});

export function startServer() {
  return app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

export default app;

const entryFile = process.argv[1]
  ? pathToFileURL(process.argv[1]).href
  : null;

if (entryFile === import.meta.url) {
  startServer();
}
