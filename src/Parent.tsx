import React from "react";
import {
  Container,
  Form,
  InputGroup,
  Nav,
  Navbar,
  Stack,
  ToggleButton,
} from "react-bootstrap";

type Toolbar = {
  [key: string]: JSX.Element;
};

const ToolbarContext = React.createContext<Toolbar>({});

const SetToolbarContext = React.createContext<
  React.Dispatch<React.SetStateAction<Toolbar>>
>(() => {});

const useToolbar = () => React.useContext(ToolbarContext);
const useSetToolbar = () => React.useContext(SetToolbarContext);

const order: Record<string, number> = {};
export const useToolbarElement = (el: JSX.Element, deps: unknown[]) => {
  const setToolbar = useSetToolbar();
  const id = React.useId();
  if (!order[id]) order[id] = Object.keys(order).length;
  React.useEffect(() => {
    setToolbar((prev) => ({ ...prev, [id]: el }));
    return () => {
      setToolbar((prev) => {
        const newToolbar = { ...prev };
        delete newToolbar[id];
        return newToolbar;
      });
    };
  }, [el, id, ...deps, setToolbar]);
};

export const useToggle = (initial: boolean, label: string) => {
  const [value, setValue] = React.useState(initial);
  useToolbarElement(
    <ToggleButton
      checked={value}
      variant="outline-primary"
      type="checkbox"
      onClick={(e) => setValue(!value)}
      value={Number(value)}
    >
      {label}
    </ToggleButton>,
    [value]
  );
  return [value, setValue];
};

export function useTextfield(
  initial: string,
  label: string
): [string, (value: string) => void] {
  const [value, setValue] = React.useState<string>(initial);
  useToolbarElement(
    <InputGroup>
      <InputGroup.Text>{label}</InputGroup.Text>
      <Form.Control
        onChange={(e) => setValue(e.target.value)}
        value={value}
      ></Form.Control>
    </InputGroup>,
    [value]
  );
  return [value, setValue];
}

export function Toolbar() {
  const toolbar = useToolbar();
  return (
    <Navbar sticky="top" bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Options</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            {Object.entries(toolbar)
              .sort(([ida, ela], [idb, elb]) => order[ida] - order[idb])
              .map(([key, val]) => (
                <Nav.Item style={{ paddingLeft: 2, paddingRight: 2 }} key={key}>
                  {val}
                </Nav.Item>
              ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default function Parent(props: React.PropsWithChildren<{}>) {
  const [toolbar, setToolbar] = React.useState<Toolbar>({});
  return (
    <SetToolbarContext.Provider value={setToolbar}>
      <ToolbarContext.Provider value={toolbar}>
        <Toolbar />

        <Container>{props.children}</Container>
      </ToolbarContext.Provider>
    </SetToolbarContext.Provider>
  );
}
