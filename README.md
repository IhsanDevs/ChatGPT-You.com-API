![ChatGPT-You.com-API](https://socialify.git.ci/IhsanDevs/ChatGPT-You.com-API/image?description=1&descriptionEditable=ChatGPT%20API%20from%20scrapping%20API%20You.com&font=Source%20Code%20Pro&forks=1&issues=1&language=1&name=1&owner=1&pattern=Circuit%20Board&pulls=1&stargazers=1&theme=Light)

# ChatGPT-You.com-API

This is a simple API for ChatGPT from scrapping API [you.com](https://you.com)

## Goal

- [x] Create API for ChatGPT from scrapping API [you.com](https://you.com)

- [ ] Create a multi-task chat using uid in the URL route

- [ ] Etc. You can contribute to this project by creating an issue or pull request

## Installation

```bash
git clone https://github.com/IhsanDevs/ChatGPT-You.com-API.git
```

```bash
cd ChatGPT-You.com-API
```

```bash
npm install -g npm@latest
```

```bash
cp chats.json.example chats.json
```

## Usage

```bash
node .
atau
node index.js
```

# Change Port

***[If you want to change port, see in here](https://s.id/1tOWy)***

visit http://localhost:3000/?question=hello

## API

### GET {url}?question={question}

#### Example

```bash
curl {url}?question=hello
```

#### Response

```json
{
    "markdown": string,
    "html": string,
}
```

### GET {url}/histories

#### Example

```bash
curl {url}/histories
```

### Trick

If you want to create long-generated text, you can use this trick

```bash
curl {url}?question=next
```

#### Response

The server will return rendered HTML from chat histories in `chats.json`

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Please make sure to update tests as appropriate.

## Credits

- [IhsanDevs](https://github.com/IhsanDevs)
