import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";





const Lagrange =()=>{
    const data = [
        {index: 1, X:0, Y:9.81},
        {index: 2, X:20000,Y:9.7487},
        {index: 3, X:40000, Y:9.6879},
        {index: 4, X:60000, Y:9.6879},
        {index: 5, X:80000,Y:9.5682}
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
    const [N,setN] = useState(0)
    const [Xcal,setXcal] = useState(0)
    const [X,setX] = useState(0)
    const Index = new Array(N);

    const calLagrange= () => {
        var L = new Array(N);
        console.log(L)
        var ans = 0
        var up = 1
        var down = 1;
        var iter = 0;
        var obj={};
        for(var i=0;i<N;i++){
            iter++;
            for(var j=0;j<N;j++){
                if(data[Index[(j%N+N)%N]].X!=data[Index[i]].X){
                    
                    up*=(data[Index[j]].X-X);
                    console.log("up = X["+j+"]-x = "+data[Index[j]].X+"-"+X+" = "+up);
                    down*=(data[Index[j]].X-data[Index[i]].X);
                    console.log("down = X["+j+"]-X["+i+"] = "+data[Index[j]].X+"-"+data[Index[i]].X+" = "+down);
                }
                console.log("up"+(i+1)+ " = "+up);
			    console.log("down"+(i+1)+ " = "+down);
            }
            L[i] = 1;
            L[i] *= up/down;
            console.log(L)
            up = 1;
            down = 1;
            console.log("L"+i+ " = "+L[i]);
            ans += L[i]*data[Index[i]].Y;
            console.log("y = f(x) = "+ans);
            obj = {
                Iteration:iter,
                L:L[i],
                Ans:ans
            }
            data2.push(obj)
            setXcal(ans)
        }
    }

    const inputX = (event) =>{
        console.log(event.target.value)
        setX(event.target.value)
    }

    const calculateRoot = () =>{
        var n = parseInt(N)
        var Xcalnum = parseFloat(Xcal)
        for(var i=0;i<n;i++){
            Index[i] = (document.getElementById(i).value)-1;
        }
        console.log(Index)
        calLagrange(Xcalnum)
        console.log(data2);
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
                            <td>{element.index}</td>
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
                            </Form.Group>
                                <div id="NumberInput"></div>
                            <br></br>
                                <Form.Label>Input X</Form.Label>
                                <input type="number" id="X" onChange={inputX} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
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





