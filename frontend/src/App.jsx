import { useState } from "react";
import Card from "./components/ui/Card.jsx";
import Menu from "./components/ui/Menu.jsx";
import FormText from "./components/FormText.jsx";
import FormUrl from "./components/FormUrl.jsx";
import FormChat from "./components/FormChat.jsx";

const menuArray = [
  {
    id: "text",
    name: "Texto",
    description: "Genera un QR a partir de cualquier a texto",
    component: FormText,
  },
  {
    id: "url",
    name: "Url",
    description: "Genera un QR a partir de una URL",
    component: FormUrl,
  },
  {
    id: "chat",
    name: "Chat Whataspp",
    description: "Genera un QR para usarlo como mensaje de chat en Whatsapp",
    component: FormChat,
  },
];

function App() {
  const [menu, setMenu] = useState(menuArray);
  const [menuSelected, setMenuSelected] = useState(menuArray[0]);

  const ComponentFormSelected = menuSelected.component;
  // const description = menu.find(e => e.id === menuSelected)

  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen bg-gray-800">
      <div className="flex w-5xl flex-col justify-center self-center">
        <h1 className="w-full text-center text-4xl">QR GENERATOR</h1>
        <Menu menu={menu} setMenuSelected={setMenuSelected} />

        <div className="card card-dash bg-base-100 w-full mt-6">
          <div className="card-body">
            <h2 className="card-title">{menuSelected.name}</h2>
            <p>{menuSelected.description}</p>
            {/* <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div> */}
          </div>
        </div>

        <div className="flex flex-row gap-6">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mt-6">
            <div className="card-body">
              {ComponentFormSelected && <ComponentFormSelected />}
              {/* <form action="" className="h-full justify-end align-bottom">
                <TextArea />
                <button className="btn btn-neutral mt-4 w-full">Generar</button>
              </form> */}
            </div>
          </div>

          <Card />
        </div>
      </div>
    </div>
  );
}

export default App;
