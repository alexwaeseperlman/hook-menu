import React from "react";
import { Table } from "react-bootstrap";
import Parent, { useTextfield, useToggle } from "./Parent";
function Child() {
  const [toggle, setToggle] = useToggle(false, "Toggle");
  const [text, setText] = useTextfield("", "Text box");
  const [text2, setText2] = useTextfield("", "Text box 2");

  return (
    <Table>
      <thead>
        <tr>
          <th>Option</th>
          <th>value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Toggle</th>
          <th>{toggle.toString()}</th>
        </tr>
        <tr>
          <th>Text</th>
          <th>{text}</th>
        </tr>
        <tr>
          <th>Text 2</th>
          <th>{text2}</th>
        </tr>
      </tbody>
    </Table>
  );
}

function Switcher() {
  const [toggle, setToggle] = useToggle(false, "Use hooks");
  return toggle ? <Child /> : <div>Nothing to see here</div>;
}

function App() {
  return (
    <Parent>
      <Switcher />
    </Parent>
  );
}

export default App;
