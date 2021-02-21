# frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Deployment

### Deploy infrastructure
```
npm run build
sls deploy --stage dev
```

### Deploy code
```
sls s3deploy --stage dev
```
