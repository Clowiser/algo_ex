// debugger; // permet de stopper le programme dans le debugger
//2. Écrivez une fonction récursive qui retourne la factorielle d’un nombre n, passé en paramètre.

const f = (n) => { if(n === 1) {return 1;} return f(n-1)*n;}; console.log("Résultat factorielle de n : "+f(4));


//3. Écrivez une fonction récursive qui retourne la valeur Fn d’un nombre n, passé en paramètre.

const ff = (n) => { n > 1 ? n = ff(n-1)+ff(n-2) : ''; return n; }; console.log("Résultat fibonacci de n (récursif): "+ff(8));

//4.1 Écrivez une fonction récursive qui retourne la valeur Ui d’un nombre n, passé en paramètre.

let N = 15;
const U = (i) => { if (i === 0) { return N; } let n = U(i-1); n % 2 === 0 ? i = n / 2 : i = 3 * n + 1; return i; }; console.log("Résultat fonction syracuse : "+U(1));

//4.2 : Écrivez une fonction récursive qui retourne la valeur U(N, i) quelques soient N et i passés en paramètre.

const Uu = (N,i) => { if (i === 0) { return N; } let n = Uu(N,i-1); n % 2 === 0 ? i = n / 2 : i = 3 * n + 1; return i; }; console.log("Résultat fonction syracuse 2 paramétres : "+Uu(15,11));

// 5 Écrivez une fonction récursive qui retourne la valeur pgcd(a, b)

const pgcd = (a,b) => { if (b === 0) { return a; } let r; b !== 0 ? r = a % b : ''; return pgcd(b,r); }; console.log("Résultat pgcd : "+pgcd(200,300));

// 6 Formule fibonacci en itératif
let x = 0; let y = 1; let z;
const fibo = (n) => { if (n < 2 ){ return n; } for (let i = 1; i < n; i++) { z = x + y; x = y; y = z; } return z; }; console.log("Résultat fibonacci (itératif) : "+fibo(8));

// Tri tableau
console.log([3,9,7,1,6,2,8,4,5]);

const tri = (list) => {
    for(let i = 0; i < list.length; i++){
        //stocker l'index de l'élément minimum
        let min = i;
        for(let j = i+1; j < list.length; j++){
            if (list[j] < list[min]){
                // mettre à jour l'index de l'élément minimum
                min = j;
            }
        }
        let indexList = list[i];
        list[i] = list[min];
        list[min] = indexList;
    }
    return list;
};
let tab = [3,550,7,1,6,42,8,4,5];
console.log(tri(tab));