import algosdk from "algosdk";
import algo from "../assets/algo.png";
import Image from "next/image";
import React, { useState } from "react";

export default function Algosigner() {
  const [count, setCount] = useState([]);
  let acs = "";
  const algoServer = "https://testnet-algorand.api.purestake.io/ps2";
  const algoPort = "";
  const token = {
    "X-API-Key": "YpG0KO7uiT6GkDZF2u4ng1poAqgQG3Zs3Wkv2f5L", //Your APi key here
  };
  let algoClient = new algosdk.Algodv2(token, algoServer, algoPort);
  const algoSignerConnect = async () => {
    try {
      if (typeof window.AlgoSigner === "undefined") {
        window.open(
          "https://chrome.google.com/webstore/detail/algosigner/kmmolakhbgdlpkjkcjkebenjheonagdm",
          "_blank"
        );
      } else {
        await window.AlgoSigner.connect({
          ledger: "TestNet",
        });
        const accounts = await window.AlgoSigner.accounts({
          ledger: "TestNet",
        });
        console.log(accounts);
        acs = accounts[0].address;
        document.getElementById("con").innerHTML = "Connected";
        let info = await algoClient.accountInformation(acs).do();
        document.getElementById("address").innerHTML =
          "Address: " + accounts[0].address;
        document.getElementById("algo").innerHTML =
          "ALGO: " + info.amount / 1000000;
        document.getElementById("btn").innerHTML = "Connected";
      }
    } catch (error) {
      console.log(error);
      alert("Algosigner is not set up yet");
    }
  };

  return (
    <>
      <div className="w-full flex justify-center p-10">
        <h2
          onClick={algoSignerConnect}
          className="w-20v bg-red-300 text-center border-2 rounded-xl p-3"
          id="btn"
        >
          Connect Now
        </h2>
      </div>
      <div className="w-full bg-white shadow rounded border border-transparent hover:border-blue-500 cursor-pointer">
        <div className="h-60v w-full imge2-bg flex flex-col justify-between p-4">
          <div>
            <input type="checkbox" />
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-gray-600 font-medium" id="algo"></h1>
            <button className="text-gray-500 hover:text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>
          <p className="text-gray-400 text-sm my-1" id="address"></p>
          <p className="text-gray-400 text-sm my-1" id="wordlist"></p>
          <span
            id="con"
            className="uppercase text-xs bg-green-50 p-0.5 border-green-500 border rounded text-green-700 font-medium"
          >
            Disconnected
          </span>
        </div>
      </div>
    </>
  );
}
