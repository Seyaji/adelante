//  Util Snippets
export const useStateObject = (useTs: boolean) => `const [state, setState] = useState${useTs ?"<State>" : `` }({})`;

export const handleChangeObjectState = (useTs: boolean) => 
`const handleChange = (event${useTs ? `: React.ChangeEvent<HTMLInputElement>` : ""}) => {
    const { name, value } = event.target
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }
`;
