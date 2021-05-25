## Demo
https://sevenfnv1.vercel.app/search

## Build on local
Step 1: create a file `.env` and copy the below varibales to the file:
```
# bestbuy API base URL
VUE_APP_BESTBUY_API_URL=https://api.bestbuy.com/v1/

# bestbuy API_KEY
VUE_APP_API_KEY=mPlbr5GXMVkagVgzwT7T2V5X
```
Step 2: then build
```
npm i
npm run server
```

## CheckList

#### 1. State management
I implemented by `vuex` (similar as `redux` for React).
#### 2. Pagination in the product listCancel changes
Implemented.
#### 3. Lazy Loading
Implemented by `vue-router` (similar as `react-router-dom` for React).
#### 4. Responsive Layout
Implemented.
#### 5. Anything above and beyond the requirements
Expanded functions: sorting, keyword searching.


