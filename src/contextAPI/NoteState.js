import ContextAPI from "./ContextAPI"


const context = (props) => {
    const Name = "Piyush"
    const Class = 8

        return (
            <ContextAPI.Provider value={{Name, Class}}>
                {props.children}
            </ContextAPI.Provider>
        )
    }
    
export default context