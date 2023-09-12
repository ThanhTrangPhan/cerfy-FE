import axios from "axios";
import { useGlobalContext } from "lib/globalContext";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { controllerInstance, operatorInstance } from "services/service";
import Web3 from "web3";
import { Input } from 'antd';

export const HomePage = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [transAddress, setTransAddress] = useState();
  const [transAmount, setTransAmount] = useState();
  const [web3Instance, setWeb3] = useState(null);

  const history = useHistory();
  const { base, setBase } = useGlobalContext();

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  }, [walletAddress]);

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts =  await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setWalletAddress("");
      console.log("Please install MetaMask");
    }
  };

  const { isLoading, data } = useQuery(["repo"], () =>
    axios.get("https://reqres.in/api/users").then((res) => res.data)
  );
  if (isLoading) return "Loading...";

  const connectWallet = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(account[0]);
      } catch (error) {
        console.error(error.message);
      }
    } else {
      console.log("Please install MetaMask");
    }
  };
  
  const handleGetBalance = async () => {
    const mBalance = await web3Instance.eth.getBalance(walletAddress);
    console.log("mBalance", web3Instance.utils.fromWei(mBalance, "ether"));
  };

  const operatorHandler = async () => {
    const operatorContractInst = operatorInstance(web3Instance);
    const depositFee = await operatorContractInst.methods.DEPOSIT_FEE().call();
    const result = await operatorContractInst.methods.deposit().send({
      from: walletAddress,
      value: Number(depositFee),
    });
    console.log("depositFee", depositFee, Number(depositFee), result);
  };

  const isActive = async () => {
    const operatorContractInst = operatorInstance(web3Instance);

    const isActive = await operatorContractInst.methods
      .isActive(walletAddress)
      .call();
    console.log("isActive", isActive);
  };
  
  const handleAddBalance = async () => {
    const sendObj = {
      from: walletAddress,
      to: transAddress,
      value: web3Instance.utils.toWei(transAmount, "ether"),
    };
    await web3Instance.eth.sendTransaction(sendObj);
  };

  const handleUpload = async () => {
    const tokenContractInst = controllerInstance(web3Instance);
    const result = await tokenContractInst.methods
      .payFee([
        "0xd283f3979d00cb5493f2da07819695bc299fba34aa6e0bacb484fe07a2fc0ae0",
        "0x4659db3b248cae1bb6856ee63308af6c9c15239e3bb76f425fbacdd84bb15330",
      ])
      .send({
        from: walletAddress,
        value: web3Instance.utils.toWei("0.1", "ether"),
      });
    console.log("result", result);
  };

  return (
    <div className="flex flex-col justify-center items-center text-3xl font-bold h-[100vh]">
      {!isLoading &&
        data?.data?.map((item) => (
          <div
            className="underline pointer"
            onClick={() => {
              history.push(`detail/${item.id}`);
            }}
          >
            {item.id}-{item.first_name}
          </div>
        ))}
      <Input className="w-[35%]" value={transAddress} onChange={(e)=>setTransAddress(e.target.value)} placeholder="trans address" />
      <Input className="w-[35%]" value={transAmount} onChange={(e)=>setTransAmount(e.target.value)} placeholder="amount" />
      <button
        onClick={connectWallet}
        className="p-[20px] mt-[20px] border border-[black] w-[auto] h-[100px] rounded-[8px] text-[30px]"
      >
        {walletAddress && walletAddress.length > 0
          ? `Connected: ${walletAddress}`
          : "Connect Wallet"}
      </button>

      <button
        onClick={handleGetBalance}
        className="mt-[20px] border border-[black] w-[400px] h-[100px] rounded-[8px] text-[30px]"
      >
        getBalance
      </button>
      <button
        onClick={handleAddBalance}
        className="mt-[20px] border border-[black] w-[400px] h-[100px] rounded-[8px] text-[30px]"
      >
        add balance to ...{transAddress && transAddress.slice(-4)}
      </button>
      <button
        onClick={handleUpload}
        className="mt-[20px] border border-[black] w-[400px] h-[100px] rounded-[8px] text-[30px]"
      >
        upload cer id
      </button>
      <button
        onClick={operatorHandler}
        className="mt-[20px] border border-[black] w-[400px] h-[100px] rounded-[8px] text-[30px]"
      >
        become operator
      </button>
      <button
        onClick={isActive}
        className="mt-[20px] border border-[black] w-[400px] h-[100px] rounded-[8px] text-[30px]"
      >
        check active
      </button>
      <button
        className="mt-[20px] p-[10px] rounded-2xl border border-[black]"
        onClick={() => setBase(!base)}
      >
        Change context
      </button>
      <p>{`${base}`}</p>
    </div>
  );
};
