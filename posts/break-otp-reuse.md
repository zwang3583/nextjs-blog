---
title: 'Exploiting One-Time-Pad Key Reuse'
date: '2020-02-02'
---

In my Applied Cryptography class (CS 568) at Boston University, I was given an assignment to recover the key used in **One-Time-Pad (OTP)** encryption given two ciphertexts that are encrypted with the same key.

For those who are not familiar with **OTP**, it is an pretty simple encryption algorithm:

- Take in a plaintext **pt** as input
- Generate a random key **k**
- Produce ciphertext **ct** = **pt** ⊕ **k** (read about <a href = "https://en.wikipedia.org/wiki/Exclusive_or">XOR</a>)
- Return **ct**

For simplicity sake, we assume the length of **k** here to be equal to that of **pt**.

Now, if we are given two encrypted ciphertexts, **ct1** and **ct2**, it is easy to see that: **ct1** ⊕ **ct2** = **pt1** ⊕ **k** ⊕ **pt2** ⊕ **k** = **pt1** ⊕ **pt2**

Now you may ask yourself the question, what good does having **pt1** ⊕ **pt2** do? Well, in a typical sense, not so much; but there are cases where the encryption just breaks, as in the following example.

<img src='https://miro.medium.com/max/833/1*tJIwnuj8k6MVB6X7FmVDiQ.png'>

Still, if we had no prior knowledge about **pt1** and **pt2** in the above example, it can still be somewhat hard to figure out that **pt1** is a smily face and **pt2** is "SEND CASH".

In my assignment, I was given the following ground rules:

1. Every character in the text is either a lowercase letter
    or a space, except that the first character of **pt_1** is capitalized.
    No punctuation appears in the messages. 
2. Each message consists of English words in ASCII
    separated by spaces. However, the second message **pt_2** starts with a space.
3. All of the words within each message is guaranteed to come from
    the same set of the <a href = 'https://en.wikipedia.org/wiki/Most_common_words_in_English'>100 most common English words</a>.

Of all the rules, the most important one is rule 3. In the same sense that we had prior knowledge about **pt1** and **pt2** as in the picture example, if we know that the words are from a narrow list, we will have an easier time making sense of **pt1** and **pt2**.

The algorithm I developed to crack **OPT Key Reuse** is as follows.

The algorithm takes in **ct1** and **ct2** that are both hex-encoded, and will return **pt1** + **pt2**.

First, I wrote a function to check if msg is of the format Word( word)* as per rules 1 and 2.

    def check_valid(msg):
        if msg[0].isupper() == False:
            return False
        separate = msg.lower().strip().split(' ')
        for w in separate:  // checks every single word
            valid = False
            if w in words:  // 100 most common English words
                valid = True
            if not valid:
                return False
        return True

Next, I wrote another function to make guesses. Here, **pt2** is an already valid guess from a prior run of the same function, and **guesses** is a global array that stores all the prior guesses.


    def make_guess(pt1xpt2, pt2):
        for word in words:
            if len(pt2+word) <= len(pt1xpt2):
                temp = m2+word
                guess = strxor(pt1xpt2[0: len(temp)], \
                        temp.encode('utf-8')).decode('utf-8')
                if check_valid(guess):
                    if len(temp) != len(pt1xpt2):
                        guesses.append(temp+' ')
                    else:
                        guesses.append(temp)

Thus, the full algorithm is as follows:

    def two_time_pad(ct1_hex, ct2_hex):
        // convert hex data into binary data
        ct1 = unhexlify(ct1_hex)
        ct2 = unhexlify(ct2_hex)

        pt1xpt2 = strxor(ct1, ct2)
        guesses = [" "]

        // if the length matches, then we got pt2
        while len(guesses[-1]) != len(pt1xpt2):
            for g in guesses:
                make_guess(m1xm2, g, len(pt1xpt2))

        // simply just xor pt2 with pt1xpt2 to get pt1
        pt1 = strxor(pt1xpt2, guesses[-1].encode('utf-8'))\ 
              .decode('utf-8')
        return m1+guesses[-1]

Although the key is not explicitly returned through this algorithm, we can easily obtain it by doing **k** = **ct1** ⊕ **pt1** or **ct2** ⊕ **pt2**.

Obviously, this algorithm is very memory intensive. Because we need to build upon every valid guess, we cannot afford to discard any guesses. You can try this out yourself by copy pasting my code, and use the following argument: 

- ct1=b'd92d647bf108bccf7b5f5810b2630fac27836b0177460fb4b08dd4' 
- ct2=b'b32b7676f112b69a634c175dba750fac278f6a01734910beb098d5'

Although this algorithm does not break most **OPT Reuse** cases, it shines light on how easy it is to break such cases if we had the lightest knowledge about the information contained in the plaintexts. 

I hope this blog post helped you learn something new, and I appreciate you taking the time to read it to the end.

<div style="text-align: right"> - Zheng </div>