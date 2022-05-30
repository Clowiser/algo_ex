//2. Écrivez une fonction récursive qui retourne la factorielle d’un nombre n, passé en paramètre.

function f(n)
{
    // debugger; // permet de stopper le programme dans le debugger
    if(n === 1) {return 1;}
    return f(n-1)*n;
}
console.log("Résultat factorielle de n : "+f(4));


//3. Écrivez une fonction récursive qui retourne la valeur Fn d’un nombre n, passé en paramètre.

function ff(n)
{
    if (n > 1){ n = ff(n-1)+ff(n-2); }
    return n;
}
console.log("Résultat fibonacci de n : "+ff(8));

//4.1 Écrivez une fonction récursive qui retourne la valeur Ui d’un nombre n, passé en paramètre.

let N = 15;

function U(i)
{
    if (i === 0) { return N; }

    let n = U(i-1);
    n % 2 === 0 ? i = n / 2 : i = 3 * n + 1;
    return i;
}

console.log("Résultat fonction syracuse : "+U(1));

//4.2 : Écrivez une fonction récursive qui retourne la valeur U(N, i) quelques soient N et i passés en paramètre.

function Uu(N,i)
{
    if (i === 0) { return N; }

    let n = Uu(N,i-1);
    n % 2 === 0 ? i = n / 2 : i = 3 * n + 1;
    return i;
}

console.log("Résultat fonction syracuse 2 paramétres : "+Uu(15,11));

// 5 Écrivez une fonction récursive qui retourne la valeur pgcd(a, b)

function pgcd(a,b)
{
    if (b === 0) { return a; }

    if (b !== 0)
    {
        let r = a % b;
        return pgcd(b,r);
    }
}

console.log("Résultat pgcd : "+pgcd(200,300));