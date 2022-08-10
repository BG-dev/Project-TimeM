import { AuthContext } from "../context/AuthContext";
import React, { useContext } from "react";
import axios from "axios";
import { useState } from "react";

export const useRequest = () => {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState({});

  const request = async (method, url, body = false) => {
    setLoading(true);
    try {
      const response = await axios({
        method: method,
        url: url,
        data: body,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, request };
};

export default useRequest;
