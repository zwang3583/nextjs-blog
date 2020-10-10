---
title: 'Proving the Differential Privacy of the Above Threshold Algorithm'
date: '2020-05-12'
---

I realize that this blog requires an ample amount of background knowledge for clear comprehension; unfortunately, I do not consider myself an expert in any of the relevant fields and therefore do not feel right to describe the concepts in my own words. If interested, I recommend you to read about:

- Differential Privacy
- Sparse Vector Algorithm
- Approximate Relational Hoare Logic
- Probabilistic Coupling
- Sequential Composition (simplier proof, but higher privacy budget)

Under the guidance of <a href='http://cs-people.bu.edu/gaboardi/'>Professor Marco Gaboardi</a> and <a href='https://alleystoughton.us/'>Professor Alley Stoughton</a> and together with my colleague James Sweeney, we were able to prove the **Differential Privacy** of the **Above Threshold Algorithm** using <a href = 'https://www.easycrypt.info/trac/'>**EasyCrypt**</a> and its implementation of **Approximate Relational Hoare Logic**.

The **Above Threshold Algorithm (aboveT)**, implemented in **EasyCrypt**, is as follows:

    proc aboveT (db : int list, n:int, t : int) : int = {
        var i : int;
        var nT : int;
        var s : int;
        var r: int;
        s<-0;
        i <- 0;
        r <- n;
        nT <$ lap (eps/2%r) t;
        while (i < n) {
        s <$ lap (eps/4%r) (evalQ i db);
        if (nT <= s /\ r = n){
            r <- i;
        }
        i <- i + 1;
        }
        return r;
    }

In the algorithm, we introduced several variables. They are as follows:

* db: the “database”, our list of integer values
* t: the base threshold, before the Laplace noise is added
* i: the index of db that we are currently considering
* nT: the noisy threshold, after ε/2 Laplace noise is added
* r: the result, the first place where (evalQ i db) exceeds nT
* s: the resulting value of a query at db[i], with ε/4 Laplace noise added

To begin the (ε, 0)-**differential privacy** proof, we must first introduce the goal in the form of a lemma in **EasyCrypt** with the assumption that the databases are **adjacent databases**:

    lemma dp N: 0<=N => aequiv
    [ [eps & 0%r]
    M1.aboveT ~ M1.aboveT :  (adjacent db{1} db{2} /\ 
    ={n, t} /\ n{1} = size db{1}) ==> res{2} = res{1} ].

We will approach this proof with **Probabilistic Coupling** in mind. To begin the proof, we introduce the following lines:

    proof.
    move => H.
    proc.

Here, *proof* is how we tell **EasyCrypt** that we are beginning the proof, and we *move* our assumptions into hypothesis **H**, and read the procedure involved in the algorithm using *proc*.

To take care of the initial 3 introduction and assignment of variables, we can use the *seq* tactic.

    seq 3 3 :  (adjacent db{1} db{2} /\ ={s, n, i, r, t} /\ 
        s{1} = 0 /\ i{1} = 0 /\ r{1} = n{1} /\ n{1} = size db{1}). 
    toequiv; auto.

We simply restate our assumptions, along with the fact that the variables now have their specific value. Because nothing of value is added, we can run the *auto* tactic to resolve the goal introduced with the *seq* tactic.

Now, we need to account for the **privacy budget** of ε/2 when computing the noisy threshold by doing:

    (* cost of coupling noisy threshold is epsilon/2 *)
    seq 1 1 : (adjacent db{1} db{2} /\ ={s, i, r, t} /\ ={t} => 
        nT{1} + 1 = nT{2} /\ s{1} = 0 /\ i{1} = 0 /\ r{1} = n{1} 
        /\ n{1} = size db{1}) <[ (eps/2%r) & 0%r ]>.
    lap 1 1.

Now, we want to prove the **pointwise equality** of *r*, our result, and move it into our hypothesis. To do this, we simply run the *pweq* tactic in combination with the *while* tactic and the *smt* solver.

    pweq(r, r).
    while true (n - i).
    auto.
    smt.
    skip.
    smt.
    while true (n - i).
    auto.
    smt.
    skip.
    smt.
    smt.
    move => r.

Now that the assignment of variables is taken care of, we arrive at the beginning of the while loop. We could try to use the usual *while* tactic but this would not bring us very far. Instead, we use the approximate while (*awhile*) tactic which takes as additional parameters two functions describing how the **privacy budget** change at each iteration, and how the number of iterations decreases.

    awhile  [ (fun _ => eps/2%r) & (fun _ => 0%r) ] N [N-i-1] 
        (adjacent db{1} db{2} /\ ={i, r} 
        /\ size db{1} = size db{2} /\
        (nT{1}<=s{1} => r = s{1}) /\ 
        (nT{2}<=s{2} => r = s{2})).

The loop invariant here self-explanatory, and since we have already proved the **pointwise equality** of *r*, the proof simply resolves itself by using the *smt* solver and running the *progress* tactic.

    smt.
    progress.
    qed.

I understand that this blog may make little sense given the immense context that I left out, but I still hope you gained some insight!

<div style="text-align: right"> - Zheng </div>