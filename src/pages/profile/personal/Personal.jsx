import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../context/Context";
import "./Personal.css";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Alert, TextField } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import axios from "axios";
import SaveIcon from '@mui/icons-material/Save';
import { REST_API } from "../../../utils/urlApi";


import { db } from "../../../firebase/firebase-config";

import {getFirestore, setDoc, doc, onSnapshot, getDoc,querySnapShot, updateDoc } from "firebase/firestore";




const Personal = () => {
  const { dispatch, user } = useContext(Context);
  const [firebaseUsers, setFirebaseUsers] = useState({})
  


  const [login, setLogin] = useState(firebaseUsers.login);
  const [surname, setSurname] = useState(firebaseUsers.surname);
  const [email, setEmail] = useState(firebaseUsers.email);
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [adress, setAdress] = useState("");
  const [index, setIndex] = useState("");
  const [additional, setAdditional] = useState("");
  const [number, setNumber] = useState(firebaseUsers.number);
  const [age, setAge] = useState("");
  const [isAcc, setIsAcc] = useState(false);


  const navigate = useNavigate();

  const goBackNotAtAll = () => {
    navigate(-0.5);
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleCangeInPersonal = () => {
    setIsAcc(true);
  };
  const handleCancelAdress = () => {
    setIsAcc(false)
}



  const handleChangePersonal = async(e) => {
    e.preventDefault()

    const res = await updateDoc(doc(db, "users", user.uid), {
      login,
      email,
      password,
      surname,
      age,
      gender,
      country,
      city,
      adress,
      index,
      number,
      additional,
    }).then(res => console.log(res))

    getDoc(doc(db, 'users', user.uid)).then(doc => setFirebaseUsers(doc.data()))

    setTimeout(2000, goBack())

    setLogin('')
    setSurname('')
    setEmail('')
    setPassword('')
    setAge('')
    setNumber('')
    setGender('')
    goBackNotAtAll()
  }



  useEffect(() => {
    return getDoc(doc(db, 'users', user.uid)).then(doc => setFirebaseUsers(doc.data()))
  })


  return (
    <div>
      <h5>???????? ???????????????????????? ????????????????????</h5>
      <hr />
      <div>
        <p>
          ????????????????????, ???? ?????????????????? ?????????????????? ???????????? ???????????????????? ?? ???????????? ??????????
          ??????????????????.
        </p>
        <div>
          {isAcc ? (
            <form onSubmit={handleChangePersonal} className="pesonalForm">
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    onChange={(e) => setGender(e.target.value)}
                    value="??????????????"
                    control={<Radio />}
                    label="??????????????"
                  />
                  <FormControlLabel
                    onChange={(e) => setGender(e.target.value)}
                    value="??????????????"
                    control={<Radio />}
                    label="??????????????"
                  />
                </RadioGroup>
              </FormControl>
              <div>
                <TextField
                  onChange={(e) => setLogin(e.target.value)}
                  value={login}
                  id="outlined-basic"
                  label="?????????????? ???????? ??????"
                  variant="outlined"
                  className="inputTextPersonal"
                  required
                  style={{
                    margin: "15px 25px",
                  }}
                />
                <TextField
                  onChange={(e) => setSurname(e.target.value)}
                  value={surname}
                  id="outlined-basic"
                  label="?????????????? ???????? ??????????????"
                  variant="outlined"
                  className="inputTextPersonal"
                  required
                  style={{
                    margin: "15px 25px",
                  }}
                />
              </div>
              <div>
                <TextField
                  onChange={(e) => setAge(e.target.value)}
                  id="date"
                  label="???????? ????????????????"
                  type="date"
                  className="inputTextPersonal"
                  defaultValue="0000-00-00"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{
                    width: "35%",
                    margin: "15px 25px",
                  }}
                />
                <TextField
                  onChange={(e) => setNumber(e.target.value)}
                  value={number}
                  id="outlined-basic"
                  label="?????????????? ?????????? ??????"
                  variant="outlined"
                  className="inputTextPersonal"
                  type="tel"
                  required
                  style={{
                    margin: "15px 25px",
                  }}
                />
              </div>
              <div>
                <TextField
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="inputTextPersonal"
                  type="email"
                  id="outlined-basic"
                  label="?????????????? email"
                  variant="outlined"
                  required
                  style={{
                    margin: "15px 25px",
                  }}
                />
                <TextField
                  id="outlined-basic"
                  className="inputTextPersonal"
                  label="?????????????? ????????????"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    margin: "15px 25px",
                  }}
                />
              </div>
              <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Button className="outlinedBtnAdd" variant="outlined" onClick={handleCancelAdress}> <ArrowBackIosIcon/> ????????????</Button>
                    <Button className="outlinedBtnAdd" variant="outlined" type="submit">?????????????????? <SaveIcon/></Button>
                </div>
            </form>
          ) : (
            <div className="PesonalWidth">
              <h3 style={{ textAlign: "center" }}>?????????? ???????? ?????????????? ????????????</h3>
              <hr />
              <div style={{ display: "flex", justifyContent: "space-around", flexDirection: "column" }}>
                <div>
                  <h5>??????: {user ? firebaseUsers.login : user.displayName || "???? ??????????????"}</h5>
                  <h5>email: {user ? user.email : firebaseUsers.email || "???? ??????????????"}</h5>
                  <h5>????: {user ? firebaseUsers.age : "???? ??????????????"}</h5>
                </div>
                <div>
                  <h5>??????????????: {user ? firebaseUsers.surname : "???? ??????????????"}</h5>
                  <h5>??????: {user ? firebaseUsers.gender : "???? ??????????????"}</h5>
                  <h5>????????????????????????: ????????????????????</h5>
                </div>
              </div>
              <div className="personalDisplayBTN">
                <Button
                  onClick={goBack}
                  variant="outlined"
                  style={{
                    width: "50%",
                    color: "white",
                    backgroundColor: "black",
                    margin: "15px 20px",
                  }}
                >
                  <ArrowBackIosIcon /> ??????????
                </Button>
                <Button
                  onClick={handleCangeInPersonal}
                  variant="outlined"
                  style={{
                    width: "50%",
                    color: "white",
                    backgroundColor: "black",
                    margin: "15px 20px",
                  }}
                >
                  ???????????????? <ChangeCircleIcon />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Personal;
