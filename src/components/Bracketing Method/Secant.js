import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'

const Secant =()=>{
    const print = () =>{
        return(
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th width="20%">Iteration</th>
                        <th width="20%">X0</th>
                        <th width="20%">f(X0)</th>
                        <th width="20%">X1</th>
                        <th width="20%">f(X1)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((element, index)=>{
                        return  (
                        <tr key={index}>
                            <td>{element.Iteration}</td>
                            <td>{element.X0}</td>
                            <td>{element.F0}</td>
                            <td>{element.X1}</td>
                            <td>{element.F1}</td>
                        </tr>)
                    })}
                </tbody>
            </Table>
        );
    }

    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;

    const Calsecant= (x0, x1) => {
        var f0,f1,ea,DF,DX,scope;
        var iter = 0;
        const e = 0.000001;
        var obj={};

        do
        {
            iter ++;
            scope = {
                x:x0,
            }
            f0 = evaluate(Equation, scope)
            scope = {
                x:x1,
            }
            f1 = evaluate(Equation, scope)

            DF = (f0-f1)/(x0-x1);
            DX = (-f1)/DF;
            x0 = x1;
            x1+=DX;
            obj = {
                Iteration:iter,
                X0:x0,
                X1:x1,
                F0:f0,
                F1:f1
            }
            data.push(obj)
            ea = error(x0, x1)
            //ea = Math.abs(DX/x1)*100;
            
        }while(ea>e)
        setX(x1)
    }

    const data =[];
    
    //const [Data,setData] = useState([])
    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState("(x^2)-7")
    const [X,setX] = useState(0)
    const [X0,setX0] = useState(0)
    const [X1,setX1] = useState(0)

    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputX0 = (event) =>{
        console.log(event.target.value)
        setX0(event.target.value)
    }
    const inputX1 = (event) =>{
        console.log(event.target.value)
        setX1(event.target.value)
    }

    const calculateRoot = () =>{
        const x0num = parseFloat(X0)
        const x1num = parseFloat(X1)
        //console.log(xlnum);
        //console.log(xrnum);
        Calsecant(x0num, x1num);
        //setData((Data)=>[...Data,data])
        //console.log(data);
        //console.log(Data);
        setHtml(print());
    }

    return (
            <Container>
                <h1>Secant Method</h1>
                <Form >
                    <Form.Group className="mb-3">
                    <Form.Label>Input g(x)</Form.Label>
                        <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                        <Form.Label>Input X0</Form.Label>
                        <input type="number" id="X0" onChange={inputX0} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                        <Form.Label>Input X1</Form.Label>
                        <input type="number" id="X1" onChange={inputX1} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                    </Form.Group>
                    <Button variant="dark" onClick={calculateRoot}>
                        Calculate
                    </Button>
                </Form>
                <br></br>
                <h5>Answer = {X.toPrecision(7)}</h5>
                <Container>
                {html}
                </Container>
            </Container>
            
    )
}

export default Secant





