# backend

diagram db: https://dbdiagram.io/d/6404ccf2296d97641d8589c7 <br />
source api: https://docs.google.com/document/d/1CPJrx3pA0Jv5GVAcEpaOK1QWkTm8xNUX-t-2zn_s8hI/edit

---

### api docs

---

<details>
 <summary><code>POST</code> <code><b>/signIn</b></code></summary>

##### Parameters

> | name     | type     | data type | description         |
> | -------- | -------- | --------- | ------------------- |
> | username | required | string    | email / phoneNumber |
> | password | required | string    | N/A                 |

##### Responses

> | http code | content-type       | response                              |
> | --------- | ------------------ | ------------------------------------- |
> | `200`     | `application/json` | `{"status":"success", "token":token}` |
> | `400`     | `application/json` | `{"status":"wrong"}`                  |

</details>

<details>
 <summary><code>POST</code> <code><b>/signUp</b></code></summary>

##### Parameters

> | name        | type     | data type | description |
> | ----------- | -------- | --------- | ----------- |
> | fullName    | required | string    | N/A         |
> | email       | required | string    | N/A         |
> | password    | required | string    | N/A         |
> | phoneNumber | required | string    | N/A         |

##### Responses

> | http code | content-type       | response                     |
> | --------- | ------------------ | ---------------------------- |
> | `200`     | `application/json` | `{}`                         |
> | `400`     | `application/json` | `{"msg": "something wrong"}` |

</details>

<details>
 <summary><code>POST</code> <code><b>/balanceSummary</b></code> <code>(BusinessLogic)</code></summary>

##### Details

totalNumber: totalDeposit + microFinancePotentaiLending + peerSharePotentaiLending
microFinancePotentiaLending: get all peerSharingDetail by userId then sumup potential amount
peerSharePotentaiLending: get all microFinanceDetail by userId then sumup potential amount

##### Parameters

> | name     | type     | data type | description |
> | -------- | -------- | --------- | ----------- |
> | username | required | string    | N/A         |

##### Responses

> | http code | content-type       | response                                                           |
> | --------- | ------------------ | ------------------------------------------------------------------ |
> | `200`     | `application/json` | `{totalBalance: Number, microFinance: Number, peerShare: Number }` |
> | `400`     | `application/json` | `{"msg": "something wrong"}`                                       |

</details>

<details>
 <summary><code>POST</code> <code><b>/addMoney</b></code></summary>

##### Details

- Front Back Thrid-party API
- Button addMoney /addMoney–-> username, amount —-> omise/opn
- OK/NOT OK←—

##### Parameters

> | name     | type     | data type | description |
> | -------- | -------- | --------- | ----------- |
> | username | required | string    | N/A         |
> | amount   | number   | string    | N/A         |

##### Responses

> | http code | content-type       | response                     |
> | --------- | ------------------ | ---------------------------- |
> | `200`     | `application/json` | `{}`                         |
> | `400`     | `application/json` | `{"msg": "something wrong"}` |

</details>

<details>
 <summary><code>POST</code> <code><b>/withdrawn</b></code></summary>

##### Parameters

> | name     | type     | data type | description |
> | -------- | -------- | --------- | ----------- |
> | username | required | string    | N/A         |
> | amount   | number   | string    | N/A         |

##### Responses

> | http code | content-type       | response                     |
> | --------- | ------------------ | ---------------------------- |
> | `200`     | `application/json` | `{}`                         |
> | `400`     | `application/json` | `{"msg": "something wrong"}` |

</details>

---

<details>
 <summary><code>GET</code> <code><b>/peerShareSummary?username={username}
</b></code></summary>

##### Parameters

> | name     | type     | data type | description |
> | -------- | -------- | --------- | ----------- |
> | username | required | string    | N/A         |

##### Responses

> | http code | content-type       | response                                                              |
> | --------- | ------------------ | --------------------------------------------------------------------- |
> | `200`     | `application/json` | `{"peerShareTotal":number, "currentDE":string, "creditScore":string}` |
> | `400`     | `application/json` | `{"msg": "something wrong"}`                                          |

</details>

<details>
 <summary><code>GET</code> <code><b>/getAllpeerShareDetail?username={username}
</b></code></summary>

##### Details

Member, payment, credit : query from db
Joinable: query user credit then check with peerShareDetail credit

##### Parameters

> | name     | type     | data type | description |
> | -------- | -------- | --------- | ----------- |
> | username | required | string    | N/A         |

###### peerShareDetail

> | name     | data type | description |
> | -------- | --------- | ----------- |
> | member   | number    | N/A         |
> | payment  | number    | N/A         |
> | credit   | string    | N/A         |
> | joinable | boolean   | N/A         |

##### Responses

> | http code | content-type       | response                               |
> | --------- | ------------------ | -------------------------------------- |
> | `200`     | `application/json` | `{"peerShareList": peerShareDetail[]}` |
> | `400`     | `application/json` | `{"msg": "something wrong"}`           |

</details>
