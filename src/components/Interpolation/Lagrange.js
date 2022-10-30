import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";


const Lagrange =()=>{
    const data = [
        {index: 0, X:0, Y:9.81},
        {index: 1, X:20000,Y:9.7487},
        {index: 2, X:40000, Y:9.6879},
        {index: 3, X:60000, Y:9.6879},
        {index: 4, X:80000,Y:9.5682}
    ]
    const data2 =[];

    const print = () =>{
        return(
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th width="50%">L</th>
                        <th width="50%">f(x)</th>
                    </tr>
                </thead>
                <tbody>
                    {data2.map((element, index)=>{
                        return  (
                        <tr key={index}>
                            <td>L{element.Iteration} = {element.L}</td>
                            <td>{element.Ans}</td>
                        </tr>)
                    })}
                </tbody>
            </Table>
        );
    }

    const [html, setHtml] = useState(null);
    
    const [N, setN] = useState(0)
    const [Xcal, setXcal] = useState(0)
    const [X, setX] = useState(0)

    const Index = new Array(N);

    const calLagrange= () => {
        var L = new Array(N);
        var ans = 0
        var up = 1
        var down = 1;
        var iter = 0;
        var obj={};
        for(var i=0;i<N;i++){
            iter++;
            for(var j=0;j<N;j++){
                if(data[Index[(j%N+N)%N]].X!==data[Index[i]].X){
                    
                    up*=(data[Index[j]].X-X);
                    down*=(data[Index[j]].X-data[Index[i]].X);
                }
            }
            L[i] = 1;
            L[i] *= up/down;
            up = 1;
            down = 1;
            ans += L[i]*data[Index[i]].Y;
            obj = {
                Iteration:iter,
                L:L[i],
                Ans:ans
            }
            data2.push(obj)
            setXcal(ans)
        }
    }

    const calculateRoot = () =>{
        var n = parseInt(N)
        var Xcalnum = parseFloat(Xcal)
        for(var i=0;i<n;i++){
            Index[i] = (document.getElementById(i).value)-1;
        }
        calLagrange(Xcalnum)
        setHtml(print());
    }

    const createInput=(event)=>{
        var InputString="";
        setN(event.target.value)
        var Size = event.target.value;
       
        for(var i=0;i<Size;i++){
            InputString+="<input type='number' id='"+i+"' style='width:20%, margin:0 auto'className='form-control'/>"
            //setindex(document.getElementById("'input"+i+"'"))
        }
        document.getElementById("NumberInput").innerHTML=InputString;
    }
    
    return (
            <Container>
                <h1>Lagrange Interpolation Method</h1>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="20%">Position</th>
                            <th width="40%">X</th>
                            <th width="40%">Y</th>
                        </tr>
                    </thead>
                <tbody>
                    {data.map((element, index)=>{
                        return  (
                        <tr key={index}>
                            <td>{element.index+1}</td>
                            <td>{element.X}</td>
                            <td>{element.Y}</td>
                        </tr>)
                    })}
                </tbody>
                </Table>
                <Container>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Input number of point</Form.Label>
                            <input type="number" id="N" onChange={createInput} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                            <div id="NumberInput"></div>
                            <br></br>
                            <Form.Label>Input X</Form.Label>
                            <input type="number" id="X" onChange={(e)=>{setX(e.target.value)}} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                        </Form.Group>
                        <br></br>
                        <Button variant="dark" onClick={calculateRoot}>
                            Calculate
                        </Button>
                    </Form>
                        <br></br>
                <h5>Answer = {Xcal.toPrecision(7)}</h5>
                <Container>
                {html}
                </Container>
                </Container>
            </Container> 
    )
}

export default Lagrange





