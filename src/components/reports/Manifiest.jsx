import moment from "moment";
import React, { useEffect } from "react"
import { useState } from "react";
import Imagen1 from "../../assets/reportes/imagen1.png";
import { getManifest } from "../../services/reports/ManifestService";
import { range } from "lodash";

const Manifiest = () => {

    const [data, setData] = useState([]);
    const [count,] = useState(20);

    useEffect(() => {

        getManifest().then(({ status, data }) => {
            console.log(data, status);
            if (status === 200) {
                setData(data[0]);
            }
        }).catch((error) => {
            console.log(error);
        });

    }, [])


    return (
        <div className="d-block m-auto" style={{ width: "2100", height: "auto", padding: "1rem", border: "solid 1px #c2c2c2", borderRadius: "4px" }}>
            <div className="row">
                <div className="d-flex col-12 pt-2 pb-2">
                    <div className="col-2"><img src={Imagen1} alt="logo" width="auto" height="32px" /></div>
                    <div className="col-10 text-center"> <h4><strong>{moment().format("Y")} International Deployment Manifest</strong></h4></div>
                </div>
            </div>
            <div className="row">
                <div className="d-flex col-12 ml-3">
                    <div className="d-flex col-5 p-0">
                        <div className="col-6 p-0 pl-1 border border-dark">
                            <small className="font-weight-normal">Sending Participant Name & Project #</small>
                        </div>
                        <div className="col-6 border border-dark"></div>
                    </div>
                    <div className="col-1"></div>
                    <div className="d-flex col-4 p-0">
                        <div className="col-6 p-0 pl-1 border border-dark">
                            <small className="font-weight-normal">Point of Entry Airport</small>
                        </div>
                        <div className="col-6 border border-dark"></div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="d-flex col-12 ml-3">
                    <div className="d-flex col-5 p-0">
                        <div className="col-6 p-0 pl-1 border border-dark">
                            <small className="font-weight-normal">Receiving Participant</small>
                        </div>
                        <div className="col-6 border border-dark"></div>
                    </div>
                    <div className="col-1"></div>
                    <div className="d-flex col-4 p-0 ">
                        <div className="col-6 p-0 pl-1 border border-dark">
                            <small className="font-weight-normal">Carrier</small>
                        </div>
                        <div className="col-6 border border-dark"></div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="d-flex col-12 ml-3">
                    <div className="d-flex col-5 p-0">
                        <div className="col-6 p-0 pl-1 border border-dark">
                            <small className="font-weight-normal">Financial Codes (if applicable)</small>
                        </div>
                        <div className="col-6 border border-dark"></div>
                    </div>
                    <div className="col-1"></div>
                    <div className="d-flex col-4 p-0">
                        <div className="col-6 p-0 pl-1 border border-dark">
                            <small className="font-weight-normal">Flight #</small>
                        </div>
                        <div className="col-6 border border-dark"></div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="d-flex col-12 ml-3 pb-2">
                    <div className="d-flex col-5 p-0">
                        <div className="col-6 p-0 pl-1 border border-dark">
                            <small className="font-weight-normal">CIFFC Resource Request Number</small>
                        </div>
                        <div className="col-6 border border-dark"></div>
                    </div>
                    <div className="col-1"></div>
                    <div className="d-flex col-4 p-0">
                        <div className="col-6 p-0 pl-1 border border-dark">
                            <small className="font-weight-normal">Date / ETA</small>
                        </div>
                        <div className="col-6 border border-dark"></div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="d-flex col-12 ml-3 pt-2" >
                    <div className="d-flex col-1 p-0" style={{ height: "90px" }}>
                        <div className="col-6 p-0 m-0 text-center border border-dark" style={{ height: "auto" }}>
                            <small className="font-weight-normal">Nat-ID</small>
                        </div>
                        <div className="d-block col-6 p-0" style={{ height: "90px" }}>
                            <div className="col-12 p-0 text-center border border-dark" style={{ height: "30px" }}>
                                <small className="font-weight-normal">Position</small>
                            </div>
                            <div className="col-12 p-0 m-0 text-center border border-dark" style={{ height: "60px" }}>
                                <small className="font-italic">Mnemonic</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-2 p-0">
                        <div className="col-12 p-0 m-0 text-center border border-dark" style={{ height: "30px" }}>
                            <small className="font-weight-normal text-justify">Full Legal Name (as it appears on Passport)</small>
                        </div>
                        <div className="d-flex col-12 p-0 m-0 text-center" style={{ height: "60px" }}>
                            <div className="col-6 p-0 border border-dark">
                                <small className="font-weight-normal">Family Name</small>
                            </div>
                            <div className="col-6 p-0 border border-dark">
                                <small className="font-weight-normal">Given Name(s)</small>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex col-2 p-0">
                        <div className="col-2 p-0 m-0 text-center border border-dark" style={{ height: "90px" }}>
                            <small className="font-weight-normal text-justify">M/F</small>
                        </div>
                        <div className="col-4 p-0">
                            <div className="col-12 p-0 m-0 text-center border border-dark" style={{ height: "30px" }}>
                                <small className="font-weight-normal">Date of Birth</small>
                            </div>
                            <div className="col-12 p-0 m-0 text-center border border-dark" style={{ height: "60px" }}>
                                <small className="font-weight-italic">yyyy-mm-dd</small>
                            </div>
                        </div>
                        <div className="col-6 p-0" style={{ height: "90px" }}>
                            <div className="col-12 p-0 m-0 text-center border border-dark" style={{ height: "30px" }}>
                                <small className="font-weight-normal">Weights</small>
                            </div>
                            <div className="d-flex col-12 p-0 m-0">
                                <div className="col-6 p-0 m-0 text-center p-0 border border-dark" style={{ height: "60px" }}>
                                    <div className="col-12 p-0 border-bottom">
                                        <small className="font-weight-normal">Seat</small>
                                    </div>
                                    <div className="col-12 p-0">
                                        <small className="font-weight-normal">Weight</small>
                                    </div>
                                </div>
                                <div className="col-6 p-0 m-0 text-center border border-dark" style={{ height: "60px" }}>
                                    <div className="col-12 p-0 border-bottom">
                                        <small className="font-weight-normal">Pack</small>
                                    </div>
                                    <div className="col-12 p-0">
                                        <small className="font-weight-normal">Weight</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex col-3 p-0">
                        <div className="col-3 p-0 m-0 text-center border border-dark" style={{ height: "90px" }}>
                            <small className="font-weight-normal">Country of Birth</small>
                        </div>
                        <div className="col-3 p-0 m-0 text-center border border-dark" style={{ height: "90px" }}>
                            <small className="font-weight-normal">Citizenship</small>
                        </div>
                        <div className="col-3 p-0 m-0 text-center text-wrap border border-dark" style={{ height: "90px" }}>
                            <small className="font-weight-normal">Passport Number</small>
                        </div>
                        <div className="col-3 p-0 m-0 text-center border border-dark" style={{ height: "90px" }}>
                            <div className="col-12 p-0 m-0 text-center" style={{ height: "auto" }}>
                                <small className="font-weight-normal">Passport Expiry Date</small>
                            </div>
                            <div className="col-12 p-0 m-0 text-center" style={{ height: "auto" }}>
                                <small className="font-weight-normal">yyyy-mm-dd</small>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex col-3 p-0">
                        <div className="col-3 p-0 m-0 text-center border border-dark" style={{ height: "90px" }}>
                            <div className="col-12 p-0 m-0 text-center" style={{ height: "30px" }}>
                                <small className="font-weight-normal">Country of Passport</small>
                            </div>
                            <div className="col-12 p-0 m-0 text-center" style={{ height: "60px" }}>
                                <small className="font-weight-normal">(issued by)</small>
                            </div>
                        </div>
                        <div className="col-7 p-0 m-0">
                            <div className="col-12 p-0 m-0 text-center border border-dark" style={{ height: "30px" }}>
                                <small className="font-weight-normal">Electronic Authorization Number (eTA)</small>
                            </div>
                            <div className="d-flex col-12 p-0" style={{ height: "60px" }}>
                                <div className="col-4 p-0 m-0 text-center border border-dark">
                                    <small className="font-weight-normal">Status</small>
                                </div>
                                <div className="col-4 p-0 m-0 text-center text-wrap border border-dark">
                                    <small className="font-weight-normal">eTA Number</small>
                                </div>
                                <div className="col-4 p-0 m-0 text-center border border-dark">
                                    <div className="col-12 p-0 m-0 text-center">
                                        <small className="font-weight-normal">Expiration Date</small>
                                    </div>
                                    <div className="col-12 p-0 m-0 text-center">
                                        <small className="font-weight-normal">yyyy-mm-dd</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-2 p-0" style={{ height: "90px" }}>
                            <div className="col-12 p-0 m-0 text-center border border-dark" style={{ height: "30px" }}>
                                <small className="font-weight-normal">Home Base</small>
                            </div>
                            <div className="col-12 p-0 border border-dark" style={{ height: "60px" }}>
                                <div className="col-12 p-0 m-0 text-center">
                                    <small className="font-weight-normal">Aerodrome</small>
                                </div>
                                <div className="col-12 p-0 m-0 text-center">
                                    <small className="font-weight-normal">Indicator</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {data.map((item, index) => (
                <div className="row" key={index} >
                    <div className="d-flex col-12 ml-3" >
                        <div className="d-flex col-1 p-0" >
                            <div className="d-flex col-6 p-0 m-0 text-center">
                                <div className="col-10 p-0 m-0 text-center border border-dark" style={{ height: "25px" }}>
                                    <small className="font-weight-normal">{item.nat_id}</small>
                                </div>
                                <div className="col-2 p-0 m-0 text-center border border-dark" style={{ height: "25px" }}>
                                    <small className="font-weight-normal">{item.nat_lyrics}</small>
                                </div>
                            </div>
                            <div className="d-block col-6 p-0 m-0 text-center border border-dark" style={{ height: "25px" }}>
                                <small className="font-weight-normal">{item.position}</small>
                            </div>
                        </div>
                        <div className="col-2 p-0" >
                            <div className="d-flex col-12 p-0 m-0 text-center" >
                                <div className="col-6 p-0 border border-dark" style={{ height: "25px" }}>
                                    <small className="font-weight-normal">{item.family_name}</small>
                                </div>
                                <div className="col-6 p-0 border border-dark" style={{ height: "25px" }}>
                                    <small className="font-weight-normal">{item.given_name}</small>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex col-2 p-0">
                            <div className="col-2 p-0 m-0 text-center border border-dark" style={{ height: "25px" }}>
                                <small className="font-weight-normal text-justify">{item.sex}</small>
                            </div>
                            <div className="col-4 p-0 m-0 text-center border border-dark" style={{ height: "25px" }}>
                                <small className="font-weight-italic">{item.birth_date}</small>
                            </div>
                            <div className="col-6 p-0">
                                <div className="d-flex col-12 p-0 m-0">
                                    <div className="col-6 p-0 m-0 text-center" >
                                        <div className="col-12 p-0  m-0 border border-dark" style={{ height: "25px" }}>
                                            <small className="font-weight-normal">{item.seat_weight}</small>
                                        </div>
                                    </div>
                                    <div className="col-6 p-0 m-0 text-center">
                                        <div className="col-12 p-0 m-0 border border-dark" style={{ height: "25px" }}>
                                            <small className="font-weight-normal">{item.pack_weight}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex col-3 p-0">
                            <div className="col-3 p-0 m-0 text-center border border-dark" style={{ height: "25px" }}>
                                <small className="font-weight-normal">{item.country_birth}</small>
                            </div>
                            <div className="col-3 p-0 m-0 text-center border border-dark" style={{ height: "25px" }} >
                                <small className="font-weight-normal">{item.citezenship}</small>
                            </div>
                            <div className="col-3 p-0 m-0 text-center border border-dark" style={{ height: "25px" }} >
                                <small className="font-weight-normal">{item.passport_number}</small>
                            </div>
                            <div className="col-3 p-0 m-0 text-center border border-dark" style={{ height: "25px" }} >
                                <small className="font-weight-normal">{item.passport_expiry_date}</small>
                            </div>
                        </div>
                        <div className="d-flex col-3 p-0">
                            <div className="col-3 p-0 m-0 text-center border border-dark" style={{ height: "25px" }}>
                                <small className="font-weight-normal">{item.country_passport}</small>
                            </div>
                            <div className="col-7 p-0 m-0">
                                <div className="d-flex col-12 p-0">
                                    <div className="col-4 p-0 m-0 text-center border border-dark" style={{ height: "25px" }}>
                                        <small className="font-weight-normal">{item.status}</small>
                                    </div>
                                    <div className="col-4 p-0 m-0 text-center border border-dark" style={{ height: "25px" }}>
                                        <small className="font-weight-normal">{item.eta_number}</small>
                                    </div>
                                    <div className="col-4 p-0 m-0 text-center border border-dark" style={{ height: "25px" }}>
                                        <small className="font-weight-normal">{item.expiration_date}</small>
                                    </div>
                                </div>
                            </div>
                            <div className="col-2 p-0 m-0" >
                                <div className="col-12 p-0 m-0 text-center border border-dark" style={{ height: "25px" }}>
                                    <small className="font-weight-normal">{item.aerodrome}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {range(count - data.length).map((item, index) => (
                <div className="row" key={index} >
                    <div className="d-flex col-12 ml-3" >
                        <div className="d-flex col-1 p-0" >
                            <div className="d-flex col-6 p-0 m-0 text-center">
                                <div className="col-10 p-0 m-0 text-center border border-dark" style={{ height: "25px" }}>
                                    <small className="font-weight-normal"> </small>
                                </div>
                                <div className="col-2 p-0 m-0 text-center border border-dark" style={{ height: "25px" }}>
                                    <small className="font-weight-normal"></small>
                                </div>
                            </div>
                            <div className="d-block col-6 p-0 m-0 text-center border border-dark" style={{ height: "25px" }}>
                                <small className="font-weight-normal"></small>
                            </div>
                        </div>
                        <div className="col-2 p-0" >
                            <div className="d-flex col-12 p-0 m-0 text-center" >
                                <div className="col-6 p-0 border border-dark" style={{ height: "25px" }}>
                                    <small className="font-weight-normal"></small>
                                </div>
                                <div className="col-6 p-0 border border-dark" style={{ height: "25px" }}>
                                    <small className="font-weight-normal"></small>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex col-2 p-0">
                            <div className="col-2 p-0 m-0 text-center border border-dark" style={{ height: "25px" }}>
                                <small className="font-weight-normal text-justify"> </small>
                            </div>
                            <div className="col-4 p-0 m-0 text-center border border-dark" style={{ height: "25px" }}>
                                <small className="font-weight-italic"></small>
                            </div>
                            <div className="col-6 p-0">
                                <div className="d-flex col-12 p-0 m-0">
                                    <div className="col-6 p-0 m-0 text-center p-0" >
                                        <div className="col-12 p-0 border border-dark" style={{ height: "25px" }}>
                                            <small className="font-weight-normal"></small>
                                        </div>
                                    </div>
                                    <div className="col-6 p-0 m-0 text-center" >
                                        <div className="col-12 p-0 border border-dark" style={{ height: "25px" }}>
                                            <small className="font-weight-normal"></small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex col-3 p-0">
                            <div className="col-3 p-0 m-0 text-center border border-dark" style={{ height: "25px" }}>
                                <small className="font-weight-normal"></small>
                            </div>
                            <div className="col-3 p-0 m-0 text-center border border-dark" style={{ height: "25px" }} >
                                <small className="font-weight-normal"></small>
                            </div>
                            <div className="col-3 p-0 m-0 text-center border border-dark" style={{ height: "25px" }} >
                                <small className="font-weight-normal"></small>
                            </div>
                            <div className="col-3 p-0 m-0 text-center border border-dark" style={{ height: "25px" }} >
                                <small className="font-weight-normal"></small>
                            </div>
                        </div>
                        <div className="d-flex col-3 p-0">
                            <div className="col-3 p-0 m-0 text-center border border-dark" style={{ height: "25px" }}>
                                <small className="font-weight-normal"></small>
                            </div>
                            <div className="col-7 p-0">
                                <div className="d-flex col-12 p-0">
                                    <div className="col-4 p-0 m-0 text-center border border-dark" style={{ height: "25px" }}>
                                        <small className="font-weight-normal"></small>
                                    </div>
                                    <div className="col-4 p-0 m-0 text-center border border-dark" style={{ height: "25px" }}>
                                        <small className="font-weight-normal"></small>
                                    </div>
                                    <div className="col-4 p-0 m-0 text-center border border-dark" style={{ height: "25px" }}>
                                        <small className="font-weight-normal"></small>
                                    </div>
                                </div>
                            </div>
                            <div className="col-2 p-0" >
                                <div className="col-12 p-0 m-0 text-center border border-dark" style={{ height: "25px" }}>
                                    <small className="font-weight-normal"></small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div className="row">
                <div className="d-flex col-12 ml-3 pt-3">
                    <div className="col-1 m-0 text-center border border-dark" style={{ background: "#D9D9D9" }}>
                        <small className="font-weight-normal">Date</small>
                    </div>
                    <div className="col-2 p-0" style={{ background: "#D9D9D9" }}>
                        <div className="d-flex col-12 p-0 m-0 text-center" >
                            <div className="col-6 p-0 border border-dark">
                                <small className="font-weight-normal">Airline</small>
                            </div>
                            <div className="col-6 p-0 border border-dark">
                                <small className="font-weight-normal">Flight No.</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-2 p-0" style={{ background: "#D9D9D9" }}>
                        <div className="d-flex col-12 p-0 m-0 text-center" >
                            <div className="col-9 p-0 border border-dark">
                                <small className="font-weight-normal">Departure Location</small>
                            </div>
                            <div className="col-3 p-0 border border-dark">
                                <small className="font-weight-normal">ETD</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-3 p-0">
                        <div className="d-flex col-12 p-0 m-0 text-center">
                            <div className="col-6 p-0 border border-dark" style={{ background: "#D9D9D9" }}>
                                <small className="font-weight-normal">Arrival Location</small>
                            </div>
                            <div className="col-3 p-0 border border-dark" style={{ background: "#D9D9D9" }}>
                                <small className="font-weight-normal">ETA</small>
                            </div>
                            <div className="col-3 p-0" style={{ background: "none" }}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pb-2">
                {range(4).map((item, index) => (
                    <div className="row" key={index}>
                        <div className="d-flex col-12 ml-3">
                            <div className="col-1 m-0 p-0 text-justify border border-dark" style={{ height: "25px" }}>
                                <small className="font-weight-normal"></small>
                            </div>
                            <div className="col-2 p-0" >
                                <div className="d-flex col-12 p-0 m-0 text-justify" >
                                    <div className="col-6 p-0 border border-dark" style={{ height: "25px" }}>
                                        <small className="font-weight-normal"></small>
                                    </div>
                                    <div className="col-6 p-0 border border-dark" style={{ height: "25px" }}>
                                        <small className="font-weight-normal"></small>
                                    </div>
                                </div>
                            </div>
                            <div className="col-2 p-0" style={{ height: "25px" }}>
                                <div className="d-flex col-12 p-0 m-0 text-justify" >
                                    <div className="col-9 p-0 border border-dark" style={{ height: "25px" }}>
                                        <small className="font-weight-normal"></small>
                                    </div>
                                    <div className="col-3 p-0 border border-dark" style={{ height: "25px" }}>
                                        <small className="font-weight-normal"></small>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3 p-0">
                                <div className="d-flex col-12 p-0 m-0 text-justify">
                                    <div className="col-6 p-0 border border-dark" style={{ height: "25px" }}>
                                        <small className="font-weight-normal"></small>
                                    </div>
                                    <div className="col-3 p-0 border border-dark" style={{ height: "25px" }}>
                                        <small className="font-weight-normal"></small>
                                    </div>
                                    <div className="col-3 p-0" style={{ background: "none" }}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>))}
            </div>
        </div >
    )
}

export default Manifiest;