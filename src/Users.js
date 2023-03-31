import React, { useState, useEffect } from "react";
import "./css/users.css";
import { Amplify, API, I18n } from "aws-amplify";
import config from "./aws-exports";
import { useSelector } from "react-redux";
// import { listTodos } from "./graphql/queries";
// import { createTodo } from "./graphql/mutations";
import { withAuthenticator, Button, Heading, Text, TextField, View, translations } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

I18n.putVocabularies(translations);
I18n.setLanguage('fr');

I18n.putVocabularies({
  fr: {
    'Sign In': 'Se connecter',
    'Sign Up': "S'inscrire",
    'Enter your Username': "Nom d'utilisateur",
    'Enter your Password': "Mot de passe"
  },
});

Amplify.configure(config);

const initialFormState = {
  name: "",
  description: "",
};

function Users({signOut, user}) {
  const Users = useSelector((state) => state.user);
  const [formState, setFormState] = useState(initialFormState);

  // useEffect(() => {
  //   fetchTodos();
  // }, []);

  // const fetchTodos = async () => {
  //   const apiData = await API.graphql({
  //     query: listTodos,
  //   });
  //   console.log("Mon test", apiData);
  // };

  // const createToDo = async () =>{
  //   if(!formState.name || !formState.description)
  //       return
  //   await API.graphql({
  //           query: createTodo,
  //           variables: {
  //               input: formState
  //       } 
  //   })
  // }

  return (
    <div
      style={{
        display: "flex",
        color: "#AFAFAF",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 20,
        fontFamily: "Montserrat",
      }}
    >
      <h1 style={{ fontSize: 24, fontWeight: "bold" }}>
        Apprendre n'a jamais été aussi simple et aussi facile !
      </h1>

      <div style={{}}>
        Cette application permet de mettre en relation des personnes désireuses
        d'enseigner leur savoir, et les personnes en quête de ce savoir...
      </div>

      <h2 style={{ marginTop: 30, fontSize: 14, fontWeight: "bold" }}>
        LES ENSEIGNANTS
      </h2>
      <input style={styles.input}
        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
        placeholder="name"
        value={formState.name}
      />
      <input style={styles.input}
        onChange={(e) => setFormState({ ...formState, description: e.target.value })}
        placeholder="Description"
        value={formState.description}
      />
      {/* <Button style={styles.button} onClick={createToDo}>Create ToDo</Button> */}
      <div
        style={{ width: "50%", border: "1px #D3D3D3 solid" }}
        className="teachers"
      >
        <Button style={styles.button} onClick={signOut} >Se déconnecter</Button>
        {Users.map((item, i) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                padding: 1,
              }}
              className="teacher-container-with-photo"
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="photo"
              >
                <img
                  style={{
                    display: "block",
                    margin: "0 auto",
                    maxHeight: "100%",
                    maxWidth: "100%",
                    borderRadius: "50%",
                    border: "1px solid #D3D3D3",
                  }}
                  src={item.picture}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  width: "92%",
                }}
                className="teacher-container-without-photo"
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: 1,
                    border: "1px #D3D3D3 solid",
                  }}
                  className="teacher-and-teacher-infos-supp"
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                    className="teacher"
                  >
                    <div className="pseudo">{item.name}</div>
                    <div className="location">
                      {item.address} - {item.zipCode} {item.city}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 13,
                      fontWeight: "bold",
                      flexDirection: "row",
                    }}
                    className="teacher-infos-supp"
                  >
                    <div className="subject">Matière: {item.subject}</div>
                    <div className="subject">
                      Disponible: {item.availability}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
const styles = {
    container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20, backgroundColor:'#FAF5FF' },
    todo: {  marginBottom: 15 },
    input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
    todoName: { fontSize: 20, fontWeight: 'bold' },
    todoDescription: { marginBottom: 0 },
    button: { backgroundColor: '#DDDDDD', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
  }
export default withAuthenticator(Users,{includeGreetings: true});
// export default AuthStateApp(Users)
