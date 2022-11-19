import { useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import 'chart.js/auto'
import { Line } from "react-chartjs-2";

const Jacobi = () => {
    const [N, setN] = useState(4);
    const [Ans, setAns] = useState([]);
    const [state, setState] = useState([[]]);
    const [states, setStates] = useState({
        labels: state.map((element)=>{return element.Iteration}),
        datasets: [
          {
            label: 'X',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'white',
            borderColor: 'green',
            borderWidth: 2,
            data: state.map((element)=>{return element.Ans})
          },
          {
            label: 'Error',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'white',
            borderColor: 'red',
            borderWidth: 2,
            data: state.map((element)=>{return element.Er})
          }
        ]
    });

    const update = (ans, xold) =>{
        var i;
        for (i = 0; i < ans.length; i++) {
            xold[i] = ans[i];
        }
    }
    
    const error = (ans0, ans) =>{
        var e = Math.abs((ans0-ans)/ans0);
        return e
    }
    const data =[];

    const calJacobi = (x) =>{
        var n = N;
        //console.log("n = "+n);
        var i, j;
        var ans0;
        var ans = new Array(N).fill(0);
        var xold = new Array(N).fill(0);
        var er = new Array(N).fill(100);
        //console.log("er = "+er);
        var e = 0.000001;
        var iter = 0;
        var check = true;
        var obj=[];
        do{
            iter++
            for (i = 0; i < n; i++) {
                //console.log("i = "+i);
                ans0 = ans[i];
                ans[i] = x[i][n];
                //console.log("ans = "+ans);
                for (j = 0; j < n; j++) {
                    if(x[i][(j%n+n)%n]!==x[i][i]){
                        ans[i] -= x[i][(j%n+n)%n]*xold[(j%n+n)%n];
                    }
                }
                ans[i] = ans[i]/x[i][i];
                er[i] = error(ans0,ans[i]);
                if(er[i]<e){
                    check = false;
                }else{}
                obj.push(ans[i]);
            }
            //console.log("obj = "+obj)
            data.push(obj);
            //console.log("data = "+data)
            obj = [];
            update(ans,xold);
            //console.log(iter);
        }while(check);
        //console.log(ans);
        return ans;
    }

    const fill2DimensionsArray = (arr, rows, columns) => {
        for (var i = 0; i < rows; i++) {
            arr.push([0])
            for (var j = 0; j < columns; j++) {
                arr[i][j] = 0;
            }
        }
    }

    const [Matrix, setMatrix] = useState([[0, 0, 0, 0, 0],[0, 0, 0, 0, 0],[0, 0, 0, 0, 0],[0, 0, 0, 0, 0]]);

    var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
    const calculateRoot = () =>{
        var a = [];
        fill2DimensionsArray(a, N, N);
        for(var i = 0; i<N; i++){
            for(var j = 0; j<N+1; j++){
                a[i][j] = parseFloat(document.getElementById(""+i+j).value);
            }
        }
        setAns(calJacobi(a));
        setState(data);
        setStates({
            labels: data.map((element,index)=>{return index+1}),
            datasets: data[0].map((element,index)=>{
                    var i = index;
                    return {
                        label: "X"+(i+1),
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: 'white',
                        borderColor: colorArray[Math.floor(Math.random()*colorArray.length)],
                        borderWidth: 2,
                        data: data.map((e,index)=>{return e[i]})
                      }
                })
        })
    }

    return(
        <Container className="mb-4">
            <h1>Jacobi</h1>
            <Form>
            <Row className="mb-4">
                    <Col>
                    <h4>N x N</h4>
                    <input type="number" id="N" value={N} onChange={
                      e => {
                        setN(parseInt(e.target.value));
                        setMatrix(new Array(parseInt(e.target.value)).fill(new Array(parseInt(e.target.value)+1).fill(0)));
                      }
                      } className="form-control"></input>
                    </Col>
            </Row>
            </Form>
                <Container>
                <Table bordered hover variant="light">
                    <tbody>
                    {Matrix.map((element,index)=>{
                        var i = index;
                        return(
                            <tr key={i}>
                            {Matrix[index].map((e,index)=>{return(<td key={""+i+index}><h5>{i}{index}</h5><input id={""+i+index}/></td>)})}
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
                </Container>
                <Button className="mb-4" variant="dark" onClick={calculateRoot}>
                    Calculate
                </Button>
                <br></br>
                <h1>Ans =</h1>
                <Container className="mb-4">
                    <Table striped bordered hover variant="light">
                    <tbody>
                    <tr>
                    {Ans.map((element,index)=>{
                        return(
                            <td key={index}>X{index+1} = {element}</td>
                        )
                    })}
                    </tr>
                    </tbody>
                    </Table>
                </Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="20%">Iteration</th>
                            {state[0].map((e,index)=>{
                                return(
                                <th>X{index+1}</th>
                                )})}
                        </tr>
                    </thead>
                    <tbody>
                    {state.map((element,index)=>{
                        var i = index;
                        return(
                            <tr key={i}>
                            <td>{i+1}</td>
                            {state[i].map((e,index)=>{
                                return(
                                <td>{e}</td>
                                )})}
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
                <Line
                    data={states}
                    options={{
                    title:{
                        display:true,
                        text:'Bisection Method',
                        fontSize:20
                        },
                    legend:{
                    display:true,
                    position:'right'
                    }}}
                />
                <br></br>
        </Container>
    )
}

export default Jacobi