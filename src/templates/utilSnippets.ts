//  Util Snippets
export const useStateObject = `const [state, setState] = useState<State>({})`;

export const handleChangeObjectState = `
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }
`;
