/* eslint-disable no-bitwise */
const sha1 = (message: string) => {
  const msg = message + String.fromCharCode(0x80);

  const fs = {
    0: (x, y, z) => (x & y) ^ (~x & z),
    1: (x, y, z) => x ^ y ^ z,
    2: (x, y, z) => (x & y) ^ (x & z) ^ (y & z),
    3: (x, y, z) => x ^ y ^ z,
  };
  const K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  const H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];
  const ROTL = (x, n) => (x << n) | (x >>> (32 - n));
  const l = msg.length / 4 + 2;
  const N = Math.ceil(l / 16);
  const M = new Array(N);

  for (let i = 0; i < N; i++) {
    M[i] = new Array(16);
    for (let j = 0; j < 16; j++) {
      M[i][j] =
        (msg.charCodeAt(i * 64 + j * 4 + 0) << 24) |
        (msg.charCodeAt(i * 64 + j * 4 + 1) << 16) |
        (msg.charCodeAt(i * 64 + j * 4 + 2) << 8) |
        (msg.charCodeAt(i * 64 + j * 4 + 3) << 0);
    }
  }

  M[N - 1][14] = ((msg.length - 1) * 8) / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = ((msg.length - 1) * 8) & 0xffffffff;

  for (let i = 0; i < N; i++) {
    const W = new Array(80);

    for (let t = 0; t < 16; t++) {W[t] = M[i][t];}
    for (let t = 16; t < 80; t++) {W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);}

    let a = H[0];
    let b = H[1];
    let c = H[2];
    let d = H[3];
    let e = H[4];

    for (let t = 0; t < 80; t++) {
      const s = Math.floor(t / 20);
      const T = (ROTL(a, 5) + fs[s](b, c, d) + e + K[s] + W[t]) >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = (H[0] + a) >>> 0;
    H[1] = (H[1] + b) >>> 0;
    H[2] = (H[2] + c) >>> 0;
    H[3] = (H[3] + d) >>> 0;
    H[4] = (H[4] + e) >>> 0;
  }

  const pieces = [];
  for (const h of H) {
    pieces.push(('00000000' + h.toString(16)).slice(-8));
  }

  return pieces.join('');
};

export default sha1;
