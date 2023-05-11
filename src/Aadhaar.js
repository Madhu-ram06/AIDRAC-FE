import React, { useState, useEffect ,useContext} from "react";
import "./Aadhaar.css";
import DataContext from "./DataContext";

var ad=1,dl=1,pan=1;
const Aadhaar = () => {
  const { data } = useContext(DataContext);
  console.log("Entered Aadhaar")
  console.log(data);
  const [aadhaarData, setAadhaarData] = useState({
    Number: "",
    fullName: "",
    gender: "",
    dateOfBirth: "",
  });

  const [panData, setPanData] = useState({
    Number: "",
    fullName: "",
    fatherName: "",
  });

  const [dlData, setDrivingLicenseData] = useState({
    Number: "",
    fullName: "",
    Validity: "",
  });

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(data.admin);
    const extractedContent = data.extracted;
    console.log(extractedContent);

    if (extractedContent.AADHAAR) {
      setAadhaarData({
        Number: extractedContent.AADHAAR.Aadhaar_NO,
        fullName: extractedContent.AADHAAR.Name,
        gender: extractedContent.AADHAAR["F/M"],
        dateOfBirth: extractedContent.AADHAAR.DOB,
      });
    }
    else  ad=0;

    if (extractedContent.PANCARD) {
      setPanData({
        Number: extractedContent.PANCARD.PAN_NO,
        fullName: extractedContent.PANCARD.Name,
        fatherName: extractedContent.PANCARD["Parent name"],
      });
    }
    else  pan=0;

    if (extractedContent.DL) {
      setDrivingLicenseData({
        Number: extractedContent.DL.DL_NO,
        fullName: extractedContent.DL.Name,
        Validity: extractedContent.DL.Validity,
      });
    }
    else  dl=0;
  }, [data]);

  if (isAdmin) {
    return (
      <div>
        <h2>Extracted Data:</h2>
        <ul>
          {ad === 1 && (
            <li>
              <h3>Aadhaar</h3>
              <p>Number: {aadhaarData.Number}</p>
              <p>Full Name: {aadhaarData.fullName}</p>
              <p>Gender: {aadhaarData.gender}</p>
              <p>Date of Birth: {aadhaarData.dateOfBirth}</p>
            </li>
          )}
          {pan === 1 && (
            <li>
              <h3>PAN Card</h3>
              <p>Number: {panData.Number}</p>
              <p>Full Name: {panData.fullName}</p>
              <p>Father Name: {panData.fatherName}</p>
            </li>
          )}
          {dl === 1 && (
            <li>
              <h3>Driving License</h3>
              <p>Number: {dlData.Number}</p>
              <p>Full Name: {dlData.fullName}</p>
              <p>Validity: {dlData.Validity}</p>
            </li>
          )}
        </ul>
      </div>
    );
  } else {
    return <div>You do not have access to this page.</div>;
  }
};

export default Aadhaar;
