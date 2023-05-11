import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Aadhaar from "./Aadhaar";
import UserContext from "./UserContext";
import "./upload.css";

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showData, setShowData] = useState(true);
  const [aadhaarData, setAadhaarData] = useState(null);
  const [panData, setPanData] = useState(null);
  const [dlData, setDlData] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [viewData, setViewData] = useState(false);
  const [extractedContent, setExtractedContent] = useState([]);
  const { userID } = useContext(UserContext);

  const fileChangedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadFileHandler = async (e) => {
    e.preventDefault();
    try {
      alert("Loading... Please wait for 5 seconds");
      const formData = new FormData();
      formData.append("userID", userID);
      formData.append("image", selectedFile);
      const response = await fetch(
        "http://127.0.0.1:5000/api/core/extract?API_KEY=bFbgd46g1vBCOasSfKjX9PcniGZLeqAT3J4W8mUMNpHt",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        console.log("Extraction successful");

        const extracted = await response.json();
        console.log(extracted);
        console.log("This is aadhaar data");
        console.log(extracted.AADHAAR);
        setAadhaarData(extracted.AADHAAR);
        setPanData(extracted.PANCARD);
        setDlData(extracted.DL);
        setViewData(false);
        setShowData(false);
      } else {
        console.error(`Error ${response.status}: ${response.statusText}`);
      }
      alert("Image uploaded successfully!");
    } catch (error) {
      alert("Error uploading image!");
    }
  };

  const fetchData = async () => {
    try {
      const formData = new FormData();
      formData.append("userID", userID);

      const response = await fetch(
        "http://127.0.0.1:5000/api/core/extract/data?API_KEY=bFbgd46g1vBCOasSfKjX9PcniGZLeqAT3J4W8mUMNpHt",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Data fetched successfully!");
        console.log("Previous data/admin data extraction successful");

        const extracted = await response.json();
        console.log(extracted);
        setExtractedContent(extracted.extractedContent);
        setViewData(true);
        setShowData(false);
      } else {
        console.error(`Error ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      alert("Error fetching data!");
    }
  };

  const DataHandler = async (e) => {
    e.preventDefault();
    if (userID === "admin") {
      fetchData();
    } else {
      alert("View data access restricted only to admin. Please try again!");
    }
  };

  useEffect(() => {
    if (userID === "admin"&& viewData) {
      fetchData();
    }
  }, [ userID, viewData]);

  return (
    <div>
      {showData ? (
        <div className="upload">
          <label id="choose" htmlFor="choosefile">
            Choose File:
          </label>
          <input id="choosefile" type="file" onChange={fileChangedHandler} />
          <br />
          <button id="uploadbtn" onClick={uploadFileHandler} disabled={!selectedFile}>
            Upload file
          </button>
          {uploadSuccess && <p>File uploaded successfully!</p>}
          <br />
          <button id="uploadbtn" onClick={DataHandler}>
            View data
          </button>
        </div>
      ) : viewData ? (
        <div className="view">
          <div className="data-card">
            <h1 className="card-heading">Uploaded Data</h1>
            {extractedContent.map((obj, index) => (
              <div key={index} style={{ marginBottom: "20px", paddingBottom: "20px", borderBottom: "1px solid #ccc" }}>
                <h2>{obj.userID}</h2>
                {obj.AADHAAR && (
                  <div>
                    <h3>Aadhaar</h3>
                    <p>Number: {obj.AADHAAR.AADHAAR_NO}</p>
                    <p>Full Name: {obj.AADHAAR.name}</p>
                    <p>Gender: {obj.AADHAAR["F/M"]}</p>
                    <p>Date of Birth: {obj.AADHAAR.DOB}</p>
                  </div>
                )}
                {!obj.AADHAAR && <p>No Aadhaar data found</p>}
                {obj.PANCARD && (
                  <div>
                    <h3>PAN Card</h3>
                    <p>Number: {obj.PANCARD.PAN_NO}</p>
                    <p>Full Name: {obj.PANCARD.Name}</p>
                    <p>Father's Name: {obj.PANCARD["Parent name"]}</p>
                  </div>
                )}
                {!obj.PANCARD && <p>No PAN Card data found</p>}
                {obj.DL && (
                  <div>
                    <h3>Driving License</h3>
                    <p>Number: {obj.DL.DL_NO}</p>
                    <p>Full Name: {obj.DL.Name}</p>
                    <p>Validity: {obj.DL.Validity}</p>
                  </div>
                )}
                {!obj.DL && <p>No Driving License data found</p>}
              </div>
            ))}
          </div>
          <br />
          <Link to="/">Back to Home</Link>
        </div>
      ) : (
        
        <div>
          <div className="data-card">
            <h3>Aadhaar Card</h3>
            <br/>
            <br/>
            {Object.keys(aadhaarData).length!==0 ? (
              <div>
                <label>Number:</label>
                <input type="text" value={aadhaarData.AADHAAR_NO} readOnly />
                <label>Full Name:</label>
                <input type="text" value={aadhaarData.name} readOnly />
                <label>Gender:</label>
                <input type="text" value={aadhaarData["F/M"]} readOnly />
                <label>Date of Birth:</label>
                <input type="text" value={aadhaarData.DOB} readOnly />
              </div>
            ) : (
              <p>No Aadhaar data found</p>
           
              
            )}
          </div>
          <div className="data-card">
            <h3>PAN Card</h3>  <br/>
            <br/>
            {Object.keys(panData).length!==0 ? (
              
              <div>
                <label>Number:</label>
                <input type="text" value={panData.PAN_NO} readOnly />
                <label>Full Name:</label>
                <input type="text" value={panData.Name} readOnly />
                <label>Father's Name:</label>
                <input type="text" value={panData["Parent name"]} readOnly />
                
                
            </div>
              ) : (
    <p>No PAN data found</p>
    )}
    </div>
    <div className="data-card">
    <h3>Driving License</h3>
    {Object.keys(dlData).length!==0 ? (
    <div>
    <label>Number:</label>
    <input type="text" value={dlData.DL_NO} readOnly />
    <label>Full Name:</label>
    <input type="text" value={dlData.name} readOnly />
    <label>Validity</label>
    <input type="text" value={dlData.validity} readOnly />
    <button id="backbtn" onClick={() => setShowData(true)}>
    Back
    </button>
    </div>
    ) : (
    <p>No Driving License data found</p>
    )}
    </div>
    <Link to="/">Back to Home</Link>
    </div>
    )}
    </div>
    );
    }
    
    export default Upload;
    