import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'

const OnePoint =()=>{
    const print = () =>{
        return(
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th width="20%">Iteration</th>
                        <th width="20%">X0</th>
                        <th width="20%">g(X0)</th>
                        <th width="20%">X1</th>
                        <th width="20%">g(X1)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((element, index)=>{
                        return  (
                        <tr key={index}>
                            <td>{element.Iteration}</td>
                            <td>{element.X0}</td>
                            <td>{element.gX0}</td>
                            <td>{element.X1}</td>
                            <td>{element.gX1}</td>
                        </tr>)
                    })}
                </tbody>
            </Table>
        );
    }
    
    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;
    
    const Calonepoint = (x0) => {
        var gx0,gx1,ea,scope;
        var x1 = 0;
        var iter = 0;
        var MAX = 50;
        const e = 0.00001;
        var obj={};

        do
        {
            iter ++;
            scope = {
                x:x0,
            }
            gx0 = evaluate(Equation, scope)
            x1 = evaluate(Equation, scope)
            scope = {
                x:x1,
            }
            gx1 = evaluate(Equation, scope)
            obj = {
                Iteration:iter,
                X0:x0,
                X1:x1,
                gX0:gx0,
                gX1:gx1
            }
            data.push(obj)
            ea = error(x0, x1);
            x0 = x1;
        }while(ea>e && iter<MAX)
        setX(x1)
    }

    const data =[];
    
    //const [Data,setData] = useState([])
    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState("1+1/(x)")
    const [X,setX] = useState(0)
    const [X0,setX0] = useState(0)

    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputX0 = (event) =>{
        console.log(event.target.value)
        setX0(event.target.value)
    }

    const calculateRoot = () =>{
        const x0num = parseFloat(X0)

        //console.log(xlnum);
        //console.log(xrnum);
        Calonepoint(x0num);
        //setData((Data)=>[...Data,data])
        console.log(data);
        //console.log(Data);
        setHtml(print());
    }

    return (
            <Container>
                <Form >
                    <Form.Group className="mb-3">
                    <Form.Label>Input g(x)</Form.Label>
                        <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                        <Form.Label>Input X0</Form.Label>
                        <input type="number" id="X0" onChange={inputX0} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
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

export default OnePoint





