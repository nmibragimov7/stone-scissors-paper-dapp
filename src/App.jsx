import {useCallback, useState} from "react";
import {ethers, utils} from "ethers";
import {parseUnits} from "ethers/lib/utils.js";
import { toast, ToastContainer } from 'react-toastify';
const POSITION = toast.POSITION;
// console.log(utils.defaultAbiCoder.decode(['address', 'uint256'], "0x985d4ac30000000000000000000000000000000000000000000000000000000000000000"))

import Button from "./components/Button/Button.jsx";
import {classNames} from "./config/classNames.js";
import rock from "./assets/rock.png";
import scissors from "./assets/scissors.png";
import paper from "./assets/paper.png";

const contractAddress = "0x952D873420C8FFFe8b1aBc3a3FF91729bE599bd0";
const abi = [
    {
        "inputs": [],
        "stateMutability": "payable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "player",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "enum StoneScissorsPaper.Status",
                "name": "_input",
                "type": "uint8"
            },
            {
                "indexed": false,
                "internalType": "enum StoneScissorsPaper.Status",
                "name": "_innerInput",
                "type": "uint8"
            }
        ],
        "name": "GameEmit",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "getResult",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "enum StoneScissorsPaper.Status",
                "name": "_option",
                "type": "uint8"
            }
        ],
        "name": "playGame",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
]

const provider = new ethers.providers.Web3Provider(window.ethereum, 97);

function App() {
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [amount, setAmount] = useState("");
    const [letter, setLetter] = useState("");
    const connect = useCallback(async () => {
        provider.send("eth_requestAccounts", []).then(() => {
            provider.listAccounts().then(async (accounts) => {
                const signerCopy = provider.getSigner(accounts[0]);
                const contractCopy = new ethers.Contract(contractAddress, abi, signerCopy);
                setSigner(signerCopy);
                setContract(contractCopy);
            });
        });
    }, [signer, contract]);
    const play = useCallback(() => {
        if (contract) {
            let idx = 0;
            switch (letter) {
                case "scissors":
                    idx = 1;
                    break;
                case "paper":
                    idx = 2;
                    break;
                default:
                    idx = 0;
            }
            contract.playGame(idx, {
                value: parseUnits(amount, "gwei")
            }).then(_ => {
                contract.getResult()
                    .then((result) => {
                        switch (result) {
                            case 'FAIL':
                                toast.error("Вы програли");
                                break;
                            case 'DRAW':
                                toast.warning("Ничья");
                                break;
                            case 'WIN':
                                toast.success("Вы выиграли");
                                break;
                        }
                    })
            }).catch(e => {
                console.dir(e)
                toast.error(e.reason)
            })
        }
    }, [letter, contract, amount]);

    return (
        <>
            <div className="container mx-auto py-8">
                <h1 className={"text-2xl text-center mb-4"}>Game dApp</h1>
                <div className={"flex justify-center gap-4 mb-4"}>
                    <img
                        src={rock}
                        alt="rock"
                        className={classNames("rounded cursor-pointer hover:opacity-70", letter === "rock" && "opacity-70")}
                        onClick={() => setLetter("rock")}
                    />
                    <img
                        src={scissors}
                        alt="scissors"
                        className={classNames("rounded cursor-pointer hover:opacity-70", letter === "scissors" && "opacity-70")}
                        onClick={() => setLetter("scissors")}
                    />
                    <img
                        src={paper}
                        alt="paper"
                        className={classNames("rounded cursor-pointer hover:opacity-70", letter === "paper" && "opacity-70")}
                        onClick={() => setLetter("paper")}
                    />
                </div>
                <div className={"max-w-3xl mx-auto"}>
                    <input
                        type={"number"}
                        value={amount}
                        placeholder={"input gwei value"}
                        className={"input mb-4"}
                        onChange={(event) => setAmount(event.target.value)}
                    />
                    {!contract &&
                        <Button
                            className={"w-full"}
                            onClick={connect}
                        >
                            Подключить кошелек
                        </Button>}
                    {contract &&
                        <Button
                            className={"w-full"}
                            onClick={play}
                            disabled={!amount || !letter}
                        >
                            Играть
                        </Button>
                    }
                </div>
            </div>
            <ToastContainer
                hideProgressBar
                position={POSITION.TOP_CENTER}
            />
        </>
    )
}

export default App
