import { useContext } from "react";

error = (R, n, iter) =>{
	err = 0;
	for(i=0; i<n; i++){
		err += R[i]*R[i];
	}
	//console.log("err"+iter+" => sqrt("+err+") ="+Math.sqrt(err));
	return Math.sqrt(err);
}

lamda = (D, R, A, n, iter) =>{
	DA = [0, 0, 0, 0];
	up = 0;
	down = 0;
	for(i=0; i<n; i++){
		up += D[i]*R[i];
	}
	for(i=0; i<n; i++){
		for(j=0; j<n; j++){
			DA[i] += A[i][j]*D[j];
		}
		down += DA[i]*D[i];
	}
	//console.log("lamda"+iter+" => -up:"+(-up)+" down:"+down+" lamda:"+(-up)/down)
	return (-up)/down;
}

direction = (D, R, A, n, iter) =>{
	a = alpha(D, R, A, n, iter);
	Dold = D;
	D = [0, 0, 0, 0];
	for(i=0; i<n; i++){
		D[i] = (-R[i])+a*Dold[i];
	}
	//console.log("D"+iter+" => "+D);
	return D;
}

alpha = (D, R, A, n, iter) =>{
	RA = [0, 0, 0, 0];
	DA = [0, 0, 0, 0];
	up = 0;
	down = 0;
	for(i=0; i<n; i++){
		for(j=0; j<n; j++){
			RA[i] += A[i][j]*R[j];
		}
		up += RA[i]*D[i];
	}
	for(i=0; i<n; i++){
		for(j=0; j<n; j++){
			DA[i] += A[i][j]*D[j];
		}
		down += DA[i]*D[i];
	}

	//console.log("alpha"+(iter-1)+" => up:"+up+" down:"+down+" alpha:"+up/down)
	return up/down;
}

residual = (A, B, x, n, iter) =>{
	R = [0, 0, 0, 0];
	for(i=0; i < n; i++){
		for(j=0; j < n; j++){
			R[i] += A[i][j]*x[j];
		}
		R[i] -= B[i];
	}
	//console.log("R"+iter+" => "+R)
	return R;
}

round = (num, place) =>{
	if (num < 0)
        return -round(-num, place);
    p = Math.pow(10, place);
    n = (num * p).toPrecision(15);
    return Math.round(n) / p;
}

print = (iter, ans, n) =>{
	console.log("Iteration:"+iter)
    for (i = 0; i < n; i++) {
        console.log("x"+(i+1)+": "+(round(ans[i],4)));
    }
}

conjugate = (A, B, x, n, e, iter) =>{
	R = residual(A, B, x, n, iter);
	D = [0,0,0,0];
	for(i=0; i<n; i++){
		D[i] = -R[i];
	}

	//console.log("D"+iter+"=>"+D)
	while(error(R, n, iter)>e){
		l = lamda(D, R, A, n, iter);
		for(i=0; i<n; i++){
			x[i]+= l*D[i];
		}
		iter++;
		R = residual(A, B, x, n, iter);
		D = direction(D, R, A, n, iter);
		print(iter, x, n);
	}
}


e = 0.000001;
iter = 0;
A = [	[5, 2, 0, 0],
		[2, 5, 2, 0],
		[0, 2, 5, 2],	
		[0, 0, 2, 5]	];
B = [12, 17, 14, 7];
n = B.length;
x = [0, 0, 0, 0];

conjugate(A, B, x, n, e, iter);

export default conjugate
