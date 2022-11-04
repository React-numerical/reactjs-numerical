import axios from "axios";
import { useEffect, useState } from "react"
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Regression =()=>{
    const endpoint = "http://localhost:3500";

    const [data, setData] = useState ([]);
    const [InputdataX, setInputdataX] = useState(0);
    const [InputdataY, setInputdataY] = useState(0);

    const [html, setHtml] = useState(null);
    const LinearAns=[];
    const PolyAns=[];
    const PolyA=[];
    const [x, setX] = useState(0);
    const [order, setOrder] = useState(0);

    const [chartHtml, setchartHtml] = useState({
        datasets: [
            {
            label: 'X',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'white',
            borderColor: 'DarkBlue',
            borderWidth: 2,
            data: data.map((element)=>{return element.X})
            },
            {
            label: 'Y',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'white',
            borderColor: 'red',
            borderWidth: 2,
            data: data.map((element)=>{return element.Y})
            }
        ]
    })

    const fetchTodos = async () => {
        const { status, data }  = await axios.get(
            endpoint+"/data2"
        );
        if (status === 200) {
            setData(data);
            setchartHtml({
                labels: data.map((element)=>{return ("X = "+element.X)}),
                datasets: [
                    {
                    label: 'Y',
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: 'white',
                    borderColor: 'red',
                    borderWidth: 2,
                    data: data.map((element)=>{return element.Y})
                    }
                ]
            })
        }
    }

    useEffect(()=>{
        fetchTodos();
    },[]);

    const handleSubmit = async () => {
        if (InputdataX === "" || InputdataY === "") return;
        const newTodo = { id:data.length , X:parseInt(InputdataX), Y:parseInt(InputdataY)};
        const { status } = await axios.post(endpoint + "/data2", newTodo);
        fetchTodos();
        if (status === 200) {
            fetchTodos();
            setInputdataX(0);
            setInputdataY(0);
        }
        
    };

    const handleDeleteTodo = async id => {
        const { status } = await axios.delete(endpoint + `/data2/${id}`);
        if (status === 200) {
            fetchTodos();
        }
        //setData(newTodo);
    };

    const print = (s, array, r) =>{
        if(s===1){
            return(
                <Container>
                <Table striped bordered hover variant="dark">
                    <tbody>
                        <tr>
                            <th width="20%">f(x) = </th><td>( A0 ) + ( A1 ) * ( x )</td>
                        </tr>
                        <tr>
                            <th width="20%">f({array[r].X1}) = </th><td>( {array[r].A0} ) + ( {array[r].A1} ) * ( {array[r].X1} )</td>
                        </tr>
                        <tr>
                            <th width="20%">f({array[r].X1}) = </th><td>{array[r].Ans}</td>
                        </tr>
                        <tr>
                            <th width="20%">Standard Error = </th><td>{array[r].Syx}</td>
                        </tr>
                        <tr>
                            <th width="20%">R-Square = </th><td>{array[r].R2}</td>
                        </tr>
                    </tbody>
                </Table>
                </Container>
            );
        }else if(s===2){
            return(
                <Container>
                <Table striped bordered hover variant="dark">
                    <tbody>
                        <tr>
                            <th width="20">f(x) = </th>
                            <td key="Apoly">
                                {PolyA.map((element, index)=>{
                                    if(index < PolyA.length-1){
                                        return(
                                            <>( A{index} ) * ( x^{index} ) + </>  
                                        )
                                    }else{
                                        return(
                                            <>( A{index} ) * ( x^{index} )</>  
                                        )
                                    }
                                })}
                            </td>
                        </tr>
                        <tr>
                            <th width="20">f({array[r].X1}) = </th>
                            <td key="Apoly">
                                {PolyA.map((element, index)=>{
                                    if(index < PolyA.length-1){
                                        return(
                                            <>( {element} ) * ( {Math.pow((array[r].X1),index)} ) + </>  
                                        )
                                    }else{
                                        return(
                                            <>( {element} ) * ( {Math.pow((array[r].X1),index)} )</>  
                                        )
                                    }
                                })}
                            </td>
                        </tr>
                        <tr>
                            <th width="20%">f({array[r].X1}) = </th><td>{array[r].Ans}</td>
                        </tr>
                        <tr>
                            <th width="20%">Standard Error = </th><td>{array[r].Syx}</td>
                        </tr>
                        <tr>
                            <th width="20%">R-Square = </th><td>{array[r].R2}</td>
                        </tr>
                    </tbody>
                </Table>
                </Container>
            );
    }
        
    }

    const fill2DimensionsArray = (arr, rows, columns) => {
        for (var i = 0; i < rows; i++) {
            arr.push([0])
            for (var j = 0; j < columns; j++) {
                arr[i][j] = 0;
            }
        }
    }
    
    const diagonalize = (M) => {
      var m = M.length;
      var n = M[0].length;
      for(var k=0; k<Math.min(m,n); ++k) {
        var i_max = findPivot(M, k);
        if (M[i_max, k] === 0)
          throw "matrix is singular";
        swap_rows(M, k, i_max);
        for(var i=k+1; i<m; ++i) {
          var c = M[i][k] / M[k][k];
          for(var j=k+1; j<n; ++j) {
            M[i][j] = M[i][j] - M[k][j] * c;
          }
          M[i][k] = 0;
        }
      }
    }
    
    const findPivot = (M, k) => {
      var i_max = k;
      for(var i=k+1; i<M.length; ++i) {
        if (Math.abs(M[i][k]) > Math.abs(M[i_max][k])) {
          i_max = i;
        }
      }
      return i_max;
    }
    
    const swap_rows = (M, i_max, k) => {
      if (i_max !== k) {
        var temp = M[i_max];
        M[i_max] = M[k];
        M[k] = temp;
      }
    }
    
    const makeM = (a, b) => {
      for(var i=0; i<a.length; ++i) {
        a[i].push(b[i]);
      }
    }
    
    const substitute = (M) => {
      var m = M.length;
      for(var i=m-1; i>=0; --i) {
        var x = M[i][m] / M[i][i];
        for(var j=i-1; j>=0; --j) {
          M[j][m] -= x * M[j][i];
          M[j][i] = 0;
        }
        M[i][m] = x;
        M[i][i] = 1;
      }
    }
    
    const extractX = (M) => {
      var x = [];
      var m = M.length;
      var n = M[0].length;
      for(var i=0; i<m; ++i){
        x.push(M[i][n-1]);
      }
      return x;
    }
    
    const solve = (a, b) => {
      makeM(a,b);
      diagonalize(a);
      substitute(a);
      var x = extractX(a);
      return x;
    }

    const LinearRegression = () => {
        var i;
        var n = data.length
        var sumX = 0;
        var sumY = 0;
        var sumXY = 0;
        var sumX2 = 0;
        var st = 0;
        var sr = 0;
        var obj={};
        for(i=0;i<n;i++){
            sumX += data[i].X;
            //console.log("sumX = "+sumX)
            sumY += data[i].Y;
            //console.log("sumY = "+sumY)
            sumXY += data[i].X*data[i].Y;
            //console.log("sumXY = "+sumXY)
            sumX2 += data[i].X*data[i].X;
            //console.log("sumX2 = "+sumX2)
        }
    
        var xm = sumX/n;
        var ym = sumY/n;
        var a1 = (n*sumXY-sumX*sumY)/(n*sumX2-sumX*sumX)
        var a0 = ym - a1*xm;
    
        for(i =0;i<n;i++){
            st += Math.pow((data[i].Y-ym),2);
            sr += Math.pow((data[i].Y-a1*data[i].X-a0),2);
        }
    
        var syx = Math.pow((sr/(n-2)),0.5);
        var r2 = (st-sr)/st;
        var ans = a0+a1*x;
        obj = {
            X1:x,
            A0:a0,
            A1:a1,
            Ans:ans,
            Syx:syx,
            R2:r2
        }
        LinearAns.push(obj)
    }
    
    const PolynomialRegression = () => {
        var i,j,k;
        var n = data.length;
        var a = [];
        var obj = {};
        fill2DimensionsArray(a, order+1, order+1);
        var b = new Array(order+1).fill(0);
        var sum=0;
        //console.log("order = "+order)
        //console.log(a)
        for(i=0;i<order+1;i++){
            for(k=0;k<=i;k++){
                sum=0;
                var t=i+k;
                for(j=0;j<n;j++){
                    sum+= Math.pow(data[j].X,t);
                }
                //console.log("i="+i+"k="+k+"sum="+sum);
            
                a[i][k] = sum;
                a[k][i] = sum;
            }
            sum=0;
            for(j=0;j<n;j++){
                sum+= data[j].Y*Math.pow(data[j].X,i)
            }
            b[i] = sum;
            //console.log(a);
		    //console.log(b);
        }
        var sumY = 0;
        var st = 0;
        var sr = 0;
        var ans = 0;
        var f = solve(a, b);
        sum = 0;
        for(i=0;i<order+1;i++){
            ans+=f[i]*Math.pow(x,i);
            //console.log(ans)
            PolyA.push(f[i])
        }
        
        for(i=0;i<n;i++){
            sumY += data[i].Y;
        }
    
        var ym = sumY/n;
    
        for(i=0;i<n;i++){
            var ax = 0;
            for(j=0;j<order+1;j++){
                if(j===0){
                    ax-= f[j];
                }else{
                    ax-= f[j]*Math.pow(data[i].X,j);
                }
            }
            st+= Math.pow((data[i].Y-ym),2);
            sr+= Math.pow((data[i].Y+ax),2)
        }
        var syx = Math.pow((sr/(n-(order+1))),0.5);
        var r2 = (st-sr)/st;
        obj = {
            X1:x,
            Ans:ans,
            Syx:syx,
            R2:r2
        }
        PolyAns.push(obj)
    }
    
    var round = 0;
    const calculateRoot = (event) =>{
        var n, i;
        
        //console.log(x)
        //console.log(order)
        //console.log(data)
        
        if(event.target.id==="Linear"){
            LinearRegression();
            PolynomialRegression();
            setHtml(print(1, LinearAns, round));
            var chartdata = data.map((element)=>{
                var a = 0;
                for(i = 0; i< PolyA.length; i++){
                    a += PolyA[i]*(Math.pow((element.X),i))
                }
                return a;
            })
            setchartHtml({
                labels: data.map((element)=>{return ("X = "+element.X)}),
                datasets: [
                    {
                    label: 'Y',
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: 'white',
                    borderColor: 'red',
                    borderWidth: 2,
                    data: data.map((element)=>{return element.Y})
                    },
                    {
                    label: 'Linear Regression',
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: 'white',
                    borderColor: 'DarkGreen',
                    borderWidth: 2,
                    data: data.map((element)=>{return (LinearAns[round].A0+LinearAns[round].A1*element.X)})
                    },
                    {
                    label: 'Polynomial Regression',
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: 'white',
                    borderColor: 'Magenta',
                    borderWidth: 2,
                    data: chartdata
                    }
                ]
            })
            round++;
        }
        
        else if(event.target.id==="Poly"){
            LinearRegression();
            PolynomialRegression();
            setHtml(print(2, PolyAns, round));
            var chartdata = data.map((element)=>{
            var a = 0;
            for(i = 0; i< PolyA.length; i++){
                a += PolyA[i]*(Math.pow((element.X),i))
            }
            return a;
            })
            setchartHtml({
                labels: data.map((element)=>{return ("X = "+element.X)}),
                datasets: [
                    {
                    label: 'Y',
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: 'white',
                    borderColor: 'red',
                    borderWidth: 2,
                    data: data.map((element)=>{return element.Y})
                    },
                    {
                    label: 'Linear Regression',
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: 'white',
                    borderColor: 'DarkGreen',
                    borderWidth: 2,
                    data: data.map((element)=>{return (LinearAns[round].A0+LinearAns[round].A1*element.X)})
                    },
                    {
                    label: 'Polynomial Regression',
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: 'white',
                    borderColor: 'Magenta',
                    borderWidth: 2,
                    data: chartdata
                    }
                ]
            })
            n = PolyA.length;
            for(i=0;i<n;i++)
            {
                PolyA.pop();
            }
            round++;
        }
    }
    
    return (
    <Container>
        <Container className="mb-3">
            <h1>Regression Method</h1>
            <Form className="mb-3">
                <h3>Add Data </h3>
                <Row className="mb-3">
                    <Form.Group as={Col} >
                    <Form.Label>Input data X</Form.Label>
                    <input type="number" value={InputdataX} onChange={e => setInputdataX(e.target.value)} className="form-control"></input>
                    </Form.Group>
                    <Form.Group as={Col} >
                    <Form.Label>Input data Y</Form.Label>
                    <input type="number" value={InputdataY} onChange={e => setInputdataY(e.target.value)} className="form-control"></input>
                    </Form.Group>
                </Row>              
                    <Button variant="dark" onClick={handleSubmit}>Add</Button>
            </Form>
            <Row className="mb-3">
                <Col>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th colSpan={4}>Data</th>
                        </tr>
                        <tr>
                            <th width="30%">Position</th>
                            <th width="30%">X</th>
                            <th width="30%">Y</th>
                            <th width="10%"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.id}</td>
                                <td>{element.X}</td>
                                <td>{element.Y}</td>
                                <td><Button variant="light" style={ {margin:10} }onClick={() => handleDeleteTodo(element.id)}>Delete</Button></td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
                </Col>
            </Row>
            <Line
                    data={chartHtml}
                    options={{
                    title:{
                        display:true,
                        text:'Regression Method',
                        fontSize:40
                        },
                    legend:{
                    display:true,
                    position:'right'
                    }
                }}
            />
            </Container>
        <Form>
            <Row className="mb-3">
                <Col>
                <h1>Linear Regression</h1>
                <Form.Label>Input X</Form.Label>
                <input type="number" onChange={(e)=>{setX(parseInt(e.target.value))}} className="form-control"></input>
                <br></br>
                <Button id ="Linear" variant="dark" onClick={calculateRoot}>
                    Linear Regression
                </Button>
                </Col>
                <Col>
                <h1>Polynomial Regression</h1>
                <Form.Label>Input X</Form.Label>
                <input type="number" onChange={(e)=>{setX(parseInt(e.target.value))}} className="form-control"></input>
                <Form.Label>Input M</Form.Label>
                <input type="number" onChange={(e)=>{setOrder(parseInt(e.target.value))}} className="form-control"></input>
                <br></br>
                <Button id ="Poly" variant="dark" onClick={calculateRoot}>
                    Polynomial Regression
                </Button>
                </Col>
            </Row>
        </Form>
        <br></br>
        <Container>
        {html}
        </Container>
    </Container> 
    )
}

export default Regression





