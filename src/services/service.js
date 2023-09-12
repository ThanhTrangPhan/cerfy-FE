import controller from '../abi/Controller.json'
import nodeOp from '../abi/NodeOperator.json'

export const controllerInstance = (web3) => {
    console.log(web3);
    console.log(controller);
    return new web3.eth.Contract(
        controller, // abi of SC token
        "0x027393deb73ff0d055f2c5769ee708faf1df0687" // address of  token
    )
}

export const operatorInstance = (web3) => {
    console.log(web3);
    console.log(nodeOp);
    return new web3.eth.Contract(
        nodeOp, // abi of SC token
        0x68a231F23D539E3ca6cbCEDcAd8778C325a0219c // address of  token
    )
}

