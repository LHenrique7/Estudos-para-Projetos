import { useState } from "react"; //Usado quando quiser que atualize uma váriavel e a interface inteira atualize junto
import Tasks from "./components/Task.jsx";

function App() {
  // Função Principal da página (O que está exibindo está aqui)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Estudar as parada",
      descripition: "blablabla",
      isCompleted: false,
    },
  ]); // Variável state, quando atualizada a tela toda atualiza junto

  // Função para concluir uma tarefa assim que ela for clicada
  function onTaskClick(taskId) {
    const newTask = tasks.map((task) => {
      //Cria uma nova variável que vai receber a task modificada, com o campo "isCompleted" alterado

      if (task.id == taskId) {
        // Enquanto é feito um mapeamento na variável state la de cima onde contém as informações, é comparado os ID's com O ID da tarefa que foi clicada
        return { ...task, isCompleted: !task.isCompleted }; // Quando o Id for encontrado altera o campo
      }
      return task;
    });
    setTasks(newTask); //Feito isso, a variável com a alteração é enviada por "setTask" para a variável principal
  }

  //Esse return vai mandar o que eu quero que seja exibido na tela, porém só pode enviar um componente (uma div, para contornar isso, usar uma "Div container"),
  //Estilização feita com TailWind, tipo um bootstrap para usar com react (muito boa)
  return (
    <div className="bg-slate-500 w-screen h-screen flex justify-center p-6">
      <div className="w-[500px]">
        <h1 className="text-center text-white text-3xl font-bold">
          Gerenciador de Tarefas
        </h1>
        <Tasks tasks={tasks} onTaskClick={onTaskClick} />
      </div>
    </div>
  );
}

// Mandando a página com o nome de App, que vai ser requisitada em main.jsx
export default App;
