# CRUD App Todo DataTable 

This Project forked https://github.com/near-examples/crud-tutorial and lots of changes happen.

I inspired by that project and build own todo app with datatable.
# Added on app 
A new job record can be created by selecting the job's name and priority. All fields are mandatory.
Ability to sort by name and priority in listing (ordered from default Urgent to normal)
Filtering by name and priority in listing
The jobs in the list are shown in different colors or marked with different colors according to their priority.
 a. * Ability to edit jobs in the list. I. Only the severity can change.
 b. * Delete feature i. It will be deleted only after approval.

# Notes

The application will consist of two distinct layers:

- Smart contract (in web2 we may refer to this as server-side or back-end)
- Web app (in web2 we may refer to this as client-side or front-end)

## Working

**Contracts: `/todos-crud-contract/`**
1. install dependencies `cd todos-crud-contract && yarn`
2. run tests - `yarn test`
3. compile the contract - `yarn build`
4. deploy the contract - `yarn deploy`
 
**App Tests: `/todos-crud-web/`**
1. install dependencies `cd todos-crud-web && yarn`
2. start the server - `yarn start`

## Notes

- If you deploy the contract, make sure to edit the `CONTRACT_NAME` found in `todos-crud-web/src/config.js` to match your deployed contract. 
- You must be logged in to interact with the app. If you don't have a NEAR wallet, click [here](https://wallet.testnet.near.org/) to make one.
