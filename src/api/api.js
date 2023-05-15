import {
    setIsLoading,
    setError,
    setFirstName,
    setLastName,
    setToken
  } from "../reducers/auth";

export async function fetchData(dispatch) {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "POST",
      });
  
      if (response.ok) {
        const responseData = await response.json();
        const { firstName, lastName } = responseData.body;
        console.log(firstName);
        console.log(lastName);
        dispatch(setFirstName(firstName));
        dispatch(setLastName(lastName));
      } else {
        throw new Error("Profile request failed");
      }
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
    } finally {
      dispatch(setIsLoading(false));
    }
  }


export async function submitCredentials(email, password, dispatch, navigate, setErrorMessage) {
    if (!email || !password) {
      setErrorMessage("Veuillez remplir tous les champs");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        headers: {
          Accept: "aplication/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        dispatch(setToken(data.body.token));
        const token = data.body.token;
        localStorage.setItem("token", token);
        console.log(data);
        console.log("Generated token:", token);
        navigate("/profile", { replace: true });
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
      setErrorMessage("Email or password incorrect");
    }
  }