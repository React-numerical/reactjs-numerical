import axios from "axios";
import { useEffect, useState } from "react"
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Line } from "react-chartjs-2";

const MultipileRegression = () => {
    const endpoint = "http://localhost:3500";

    const [data, setData] = useState ([]);
    
    const [InputdataX1, setInputdataX1] = useState(0);
    const [InputdataX2, setInputdataX2] = useState(0);
    const [InputdataX3, setInputdataX3] = useState(0);
    const [InputdataY, setInputdataY] = useState(0);

    const [X1, setX1] = useState(4);
    const [X2, setX2] = useState(1);
    const [X3, setX3] = useState(5);
    const [target, setTarget] = useState([]);

    const [chartHtml, setchartHtml] = useState({
        labels: data.map(()=>{return (data.id*5)}),
        datasets: [
            {
                label: 'X1',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'white',
                borderColor: 'DarkBlue',
                borderWidth: 2,
                data: data.map((element)=>{return element.X1})
                },
                {
                label: 'X2',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'white',
                borderColor: 'DeepSkyBlue',
                borderWidth: 2,
                data: data.map((element)=>{return element.X2})
                },
                {
                label: 'X3',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'white',
                borderColor: 'DodgerBlue',
                borderWidth: 2,
                data: data.map((element)=>{return element.X3})
                },
                {
                label: 'Y',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'white',
                borderColor: 'Red',
                borderWidth: 2,
                data: data.map((element)=>{return element.Y})
                }
        ]
    })

    const [html, setHtml] = useState(null);
    const MultiAns=[];

    const [A0, setA0] = useState(0);
    const [A1, setA1] = useState(0);
    const [A2, setA2] = useState(0);
    const [A3, setA3] = useState(0);

    const print = (array, r) => {
        return(
            <Container>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th width="25%">A0</th>
                        <th width="25%">A1</th>
                        <th width="25%">A2</th>
                        <th width="25%">A3</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{array[r].A0}</td>
                        <td>{array[r].A1}</td>
                        <td>{array[r].A2}</td>
                        <td>{array[r].A3}</td>
                    </tr>
                </tbody>
            </Table>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th width="30%">X1</th>
                        <th width="30%">X2</th>
                        <th width="30%">X3</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{array[r].X1}</td>
                        <td>{array[r].X2}</td>
                        <td>{array[r].X3}</td>
                    </tr>
                </tbody>
            </Table>
            <Table striped bordered hover variant="dark">
                <tbody>
                <tr>
                        <th width="50%">f(X1, X2, X3) = </th><td>(A0) + (A1) * (X1) + (A2) * (X2) + (A3) * (X3)</td>
                    </tr>
                    <tr>
                        <th width="50%">f({array[r].X1},{array[r].X2},{array[r].X3}) = </th><td>({array[r].A0}) + ({array[r].A1}) * ({array[r].X1}) + ({array[r].A2}) * ({array[r].X2}) + ({array[r].A3}) * ({array[r].X3})</td>
                    </tr>
                    <tr>
                        <th width="50%">f({array[r].X1},{array[r].X2},{array[r].X3}) = </th><td>{array[r].Ans}</td>
                    </tr>
                    <tr>
                        <th width="50%">Standard Error = </th><td>{array[r].Syx}</td>
                    </tr>
                    <tr>
                        <th width="50%">R-Square = </th><td>{array[r].R2}</td>
                    </tr>
                </tbody>
            </Table>
            </Container>
        );
    }

    const fetchTodos = async () => {
        const { status, data }  = await axios.get(
            endpoint+"/data3"
        );
        if (status === 200) {
            setData(data);
            setchartHtml({
                labels: data.map((element)=>{return (element.id*5)}),
                datasets: [
                    {
                    label: 'X1',
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: 'white',
                    borderColor: 'DarkBlue',
                    borderWidth: 2,
                    data: data.map((element)=>{return element.X1})
                    },
                    {
                    label: 'X2',
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: 'white',
                    borderColor: 'DeepSkyBlue',
                    borderWidth: 2,
                    data: data.map((element)=>{return element.X2})
                    },
                    {
                    label: 'X3',
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: 'white',
                    borderColor: 'DodgerBlue',
                    borderWidth: 2,
                    data: data.map((element)=>{return element.X3})
                    },
                    {
                    label: 'Y',
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: 'white',
                    borderColor: 'Red',
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
        if (InputdataX1 === "" || InputdataX2 === "" || InputdataX3 === "" || InputdataY === "") return;
        const newTodo = { id:""+(data.length+1) , X1:parseInt(InputdataX1), X2:parseInt(InputdataX2), X3:parseInt(InputdataX3), Y:parseInt(InputdataY)};
        const { status } = await axios.post(endpoint + "/data3", newTodo);
        fetchTodos();
        if (status === 200) {
            fetchTodos();
            setInputdataX1(0);
            setInputdataX2(0);
            setInputdataX3(0);
            setInputdataY(0);
        }
        
    };

    const handleDeleteTodo = async id => {
        const { status } = await axios.delete(endpoint + `/data3/${id}`);
        if (status === 200) {
            fetchTodos();
        }
    };

    var round = 0;
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

    const CalRegression = (data3) => {
        var i,j,k;
        var order = 3;
        var n = data.length;
        var a = [];
        var obj = {};
        fill2DimensionsArray(a, order+1, order+1);
        var b = new Array(order+1).fill(0);
        var sum = 0;
        for(i=0;i<order+1;i++){
            for(k=0;k<=i;k++){
                sum=0;
                for(j=0;j<n;j++){
                    if(i===0){
                        sum+=Math.pow(data3[i][j],i)
                    }else if(k===0 && i<=order){
                        sum+= data3[i-1][j];
                    }else{
                        sum+= data3[i-1][j]*data3[k-1][j];
                    }
                }
                a[i][k] = sum;
                a[k][i] = sum;
            }
            sum=0;
            for(j=0;j<n;j++){
                if(i===0){
                    sum+= data[j].Y;
                }else{
                    sum+= data[j].Y*data3[i-1][j]
                }
            }
            b[i] = sum;
        }
        var sumY = 0;
        var st = 0;
        var sr = 0;
        
        var ans = 0;
        var f = solve(a, b);
        for(i=0;i<order+1;i++){
            if(i===0){
                ans+=f[i];
            }else if(i<order){
                ans+=f[i]*target[i-1];
            }else{
                ans+=f[i]*target[i-1];
            }
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
                    ax-= f[j]*data3[j-1][i];
                }
            }
            st+= Math.pow((data[i].Y-ym),2);
            sr+= Math.pow((data[i].Y+ax),2);
        }
        var syx = Math.pow((sr/(n-(order+1))),0.5);
        var r2 = (st-sr)/st;
        obj = {
            X1:target[0],
            X2:target[1],
            X3:target[2],
            A0:f[0],
            A1:f[1],
            A2:f[2],
            A3:f[3],
            Ans:ans,
            Syx:syx,
            R2:r2
        }
        MultiAns.push(obj)
        setA0(f[0])
        setA1(f[1])
        setA2(f[2])
        setA3(f[3])
    }

    const Targetset = () =>{
        var a = [];
        a.push(X1);
        a.push(X2);
        a.push(X3);
        setTarget(a);
    }

    const calculateRoot = () =>{
        var i,j,k;
        var c = [];
        var x1=[];
        var x2=[];
        var x3=[];
        data.map((element,index)=>{
            i = element.X1;
            j = element.X2;
            k = element.X3;
            x1.push(i);
            x2.push(j);
            x3.push(k);
        })
        c.push(x1);
        c.push(x2);
        c.push(x3);
        //console.log(c)
        //console.log(data)
        //console.log(target)
        CalRegression(c);
        setHtml(print(MultiAns, round));
        setchartHtml({
            labels: data.map((element)=>{return (element.id*5)}),
            datasets: [
                {
                label: 'X1',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'white',
                borderColor: 'DarkBlue',
                borderWidth: 2,
                data: data.map((element)=>{return element.X1})
                },
                {
                label: 'X2',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'white',
                borderColor: 'DeepSkyBlue',
                borderWidth: 2,
                data: data.map((element)=>{return element.X2})
                },
                {
                label: 'X3',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'white',
                borderColor: 'DodgerBlue',
                borderWidth: 2,
                data: data.map((element)=>{return element.X3})
                },
                {
                label: 'Y',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'white',
                borderColor: 'Red',
                borderWidth: 2,
                data: data.map((element)=>{return element.Y})
                },
                {
                label: 'X Regrssion',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'white',
                borderColor: 'GreenYellow',
                borderWidth: 2,
                data: data.map((element)=>{
                    return (A0+(A1*element.X1)+(A2*element.X2)+(A3*element.X3))})
                }
            ]
        })
        round++;
    }

    return (
        <Container>
                <h1>Multipile Regression Method</h1>
                <br></br>
                <h3>Add Data </h3>
                <Form className="mb-3">
                    <Row className="mb-3">
                        <Form.Group as={Col} >
                        <Form.Label>Input data of X1</Form.Label>
                        <input type="number" value={InputdataX1} onChange={e => setInputdataX1(e.target.value)} className="form-control"></input>
                        </Form.Group>
                        <Form.Group as={Col} >
                        <Form.Label>Input data of X2</Form.Label>
                        <input type="number" value={InputdataX2} onChange={e => setInputdataX2(e.target.value)} className="form-control"></input>
                        </Form.Group>
                        <Form.Group as={Col} >
                        <Form.Label>Input data of X3</Form.Label>
                        <input type="number" value={InputdataX3} onChange={e => setInputdataX3(e.target.value)} className="form-control"></input>
                        </Form.Group>
                        <Form.Group as={Col} >
                        <Form.Label>Input data of Y</Form.Label>
                        <input type="number" value={InputdataY} onChange={e => setInputdataY(e.target.value)} className="form-control"></input>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Col>                
                        <Button variant="dark" onClick={handleSubmit}>Add</Button>
                        </Col>
                    </Row>
                </Form>
                    <br></br>
                    <Row>
                        <Col>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th colSpan={6}>Data</th>
                                    </tr>
                                    <tr>
                                        <th width="10%">Position</th>
                                        <th width="20%">X1</th>
                                        <th width="20%">X2</th>
                                        <th width="20%">X3</th>
                                        <th width="20%">Y</th>
                                        <th width="10%"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((element, index)=>{
                                        return  (
                                        <tr key={index}>
                                            <td>{element.id}</td>
                                            <td>{element.X1}</td>
                                            <td>{element.X2}</td>
                                            <td>{element.X3}</td>
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
                                    text:'Bisection Method',
                                    fontSize:20
                                    },
                                legend:{
                                display:true,
                                position:'right'
                                }
                            }}
                    />
                    <Form>
                        <Row>
                            <Col>
                            <Form.Label>Input X1</Form.Label>
                                <input type="number" value={X1} onChange={(e)=>{setX1(parseInt(e.target.value))}} className="form-control"></input>
                                <br></br>
                                <Form.Label>Input X2</Form.Label>
                                <input type="number" value={X2} onChange={(e)=>{setX2(parseInt(e.target.value))}} className="form-control"></input>
                                <br></br>
                                <Form.Label>Input X3</Form.Label>
                                <input type="number" value={X3} onChange={(e)=>{setX3(parseInt(e.target.value))}} className="form-control"></input>
                                <br></br>
                            </Col>
                            <Col>
                                <Button className="mb-3" id ="Linear" variant="dark" onClick={Targetset}>
                                set X1,X2,X3
                                </Button>
                                <br></br>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th width="30%">X1</th>
                                        <th width="30%">X2</th>
                                        <th width="30%">X3</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{target[0]}</td>
                                        <td>{target[1]}</td>
                                        <td>{target[2]}</td>
                                    </tr>
                                </tbody>
                            </Table>

                            <Button id ="Linear" variant="dark" onClick={calculateRoot}>
                                Calculate
                            </Button>
                            </Col>
                        </Row>
                    </Form>
                        {html}
        </Container> 
    )
}
    
export default MultipileRegression