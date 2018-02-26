## A easy use fetch

### use case

support methods, `get`, `post`, `put`, `delete`

```
import EZFetch from 'path/to/ez-fetch'

EZFetch.get(url, {...params}, {...restParams}).then().catch()

```

### params

- url: support restApi like this: `/api/user/:id`
- params: just params
- restParams: params for restApi, like this {id: 1}
- customeHeader: set header
- otherConfig: set other config, like cross-domain config or cache config
- dataType: content-type config, support 'form' & 'json', default 'json'
- originResponse: if need origin response, set is true

