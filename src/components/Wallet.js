import { useState } from "react";
import "../Wallet.css";
import logo from "../assets/img/CredsProtocolLogo.png";
import Metamask from "../assets/img/MetaMask.png";
import CredsWallet from "../assets/img/CredsWallet.png";
import NewKey from "../assets/img/New.png";
import Recover from "../assets/img/Recover.png";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";
import { Clipboard2 } from "react-bootstrap-icons";
import { Clipboard2Check } from "react-bootstrap-icons";
import { ArrowBarRight } from "react-bootstrap-icons";
import { KeyFill } from "react-bootstrap-icons";
import { NavBar } from "./NavBar";
import { useMetaMask } from "metamask-react";
import CloseButton from "react-bootstrap/CloseButton";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";

export const Wallet = () => {
  const [keyvalue, setKeyValue] = useState(
    "a36db6cd1e3bb4093a88918004bfbd66421ff264d8ed904090cf171a835bf084"
  );
  const [newWallet, setNewWallet] = useState(false);
  const [createNewWallet, setCreateNewWallet] = useState(false);
  const [recoverNewWallet, setRecoverNewWallet] = useState(false);

  const { status, connect, account, chainId, ethereum } = useMetaMask();

  const onMetamask = () => {
    if (status === "initializing") {
      console.log("Synchronisation with MetaMask ongoing...");
    } else if (status === "unavailable") {
      console.log("MetaMask not available");
    } else if (status === "notConnected") {
      connect();
    } else if (status === "connecting") {
      console.log("Connecting...");
    } else if (status === "connected") {
      console.log(account);
    }
    // Sign Message and Create Cred ID
  };

  const onNewWallet = () => {
    setNewWallet(true);
  };

  const onCreateNewWallet = () => {
    onClose();
    setCreateNewWallet(true);
  };

  const onRecoverNewWallet = () => {
    onClose();
    setRecoverNewWallet(true);
  };

  const onClose = () => {
    setNewWallet(false);
    setCreateNewWallet(false);
    setRecoverNewWallet(false);
  };

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log("totally custom!")
    );

    return (
      <button type="button" onClick={decoratedOnClick}>
        {children}
      </button>
    );
  }

  function ClipboardCopy({ copyText }) {
    const [isCopied, setIsCopied] = useState(false);

    // This is the function we wrote earlier
    async function copyTextToClipboard(text) {
      if ("clipboard" in navigator) {
        return await navigator.clipboard.writeText(text);
      } else {
        return document.execCommand("copy", true, text);
      }
    }

    // onClick handler function for the copy button
    const handleCopyClick = () => {
      // Asynchronously call copyTextToClipboard
      copyTextToClipboard(copyText)
        .then(() => {
          // If successful, update the isCopied state value
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return (
      <div class="grey-box">
        {/* Bind our handler function to the onClick button property */}

        
          <p class="truncate">{keyvalue}</p>
          {isCopied ? (
            <i>
              <Clipboard2Check />
            </i>
          ) : (
            <i>
              <Clipboard2 onClick={handleCopyClick} />
            </i>
          )}
     
      </div>
    );
  }

  if (newWallet) {
    return (
      <>
        <NavBar />
        <div class="vault">
          <div id="loginform">
            <div id="closeButton">
              <CloseButton onClick={() => onClose()} />
            </div>
            <div id="valutimg">
              <img src={CredsWallet} alt="Logo" />
            </div>
            <br />

            <h2 id="headerTitle">Creds Vault</h2>
            <hr class="solid" />
            <div>
              <div class="row">
                <div class="col">
                  <div id="walleticons">
                    <img
                      src={NewKey}
                      alt="New Key"
                      onClick={() => onCreateNewWallet()}
                    />
                  </div>
                </div>
                <div class="col">
                  <div id="walleticons">
                    <img
                      src={Recover}
                      alt="Recover Key"
                      onClick={() => onRecoverNewWallet()}
                    />
                  </div>
                </div>
              </div>
            </div>
            <br />
          </div>
        </div>
      </>
    );
  } else if (createNewWallet) {
    return (
      <>
        <NavBar />
        <div class="vault">
          <div id="loginform">
            <div id="closeButton">
              <CloseButton onClick={() => onNewWallet()} />
            </div>
            <div id="valutimg">
              <img src={CredsWallet} alt="Logo" />
            </div>
            <br />
            <h2 id="headerTitle">Creds Vault</h2>
            <hr class="solid" />
            <div id="newWalletSection">
              <Accordion defaultActiveKey="1">
                <Card>
                  <Card.Header>
                    <CustomToggle eventKey="0">
                      <KeyFill id="key" size={20} />
                      <button id="generateButton">Generate Creds Key</button>
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <ClipboardCopy copyText={keyvalue} />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </div>
            <br />
          </div>
        </div>
      </>
    );
  } else if (recoverNewWallet) {
    return (
      <>
        <NavBar />
        <div class="vault">
          <div id="loginform">
            <div id="closeButton">
              <CloseButton onClick={() => onNewWallet()} />
            </div>
            <div id="valutimg">
              <img src={CredsWallet} alt="Logo" />
            </div>
            <br />
            <h2 id="headerTitle">Creds Vault</h2>
            <hr class="solid" />
            <div id="newWalletSection">
              <Accordion defaultActiveKey="1">
                <Card>
                  <Card.Header>
                    <CustomToggle eventKey="0">
                      <KeyFill id="key" size={20} />
                      <button id="generateButton">
                        Recover Using Creds Key
                      </button>
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <InputGroup className="mb-3">
                        <Form.Control
                          placeholder="Enter your recovery key"
                          aria-label="Enter your recovery key"
                          aria-describedby="basic-addon2"
                        />
                        <Button variant="outline-secondary" id="button-addon2">
                        <Link to="/profile">
                        <ArrowBarRight size={20} color={"black"} />
            </Link>
                        </Button>
                      </InputGroup>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </div>

            <br />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <NavBar />
        <div class="vault">
          <div id="loginform">
            <Link to="/">
              <div id="closeButton">
                <CloseButton />
              </div>
            </Link>

            <div id="valutimg">
              <img src={CredsWallet} alt="Logo" />
            </div>
            <br />
            <h2 id="headerTitle">Creds Vault</h2>
            <hr class="solid" />
            <div>
              <div class="row">
                <div class="col">
                  <div id="walleticons">
                    <img
                      src={Metamask}
                      alt="Metamask"
                      onClick={() => onMetamask()}
                    />
                  </div>
                </div>
                <div class="col">
                  <div id="walleticons">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3687/3687106.png"
                      alt="NewWallet"
                      onClick={() => onNewWallet()}
                    />
                  </div>
                </div>
              </div>
            </div>
            <br />
          </div>
        </div>
      </>
    );
  }
};
