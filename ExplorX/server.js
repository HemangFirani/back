const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const PORT = 3005;

function serveStaticFile(req, res, filePath, contentType) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error loading static file');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
}

function serveStaticAssets(req, res) {
  const extname = path.extname(req.url).toLowerCase();
  let contentType = 'text/plain';

  // Set content type based on file extension
  switch (extname) {
    case '.html':
      contentType = 'text/html';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'application/javascript';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
    case '.jpeg':
      contentType = 'image/jpeg';
      break;
    case '.gif':
      contentType = 'image/gif';
      break;
    default:
      contentType = 'application/octet-stream';
  }

  const filePath = path.join(__dirname, 'index.html', req.url);
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
}

function handleLogin(req, res) {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const { username, password } = querystring.parse(body);

    fs.readFile('users.json', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('Error reading user data');
      }

      const users = JSON.parse(data);
      if (users[username] && users[username] === password) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        return res.end('Login Successful');
      } else {
        res.writeHead(401, { 'Content-Type': 'text/plain' });
        return res.end('Invalid Credentials');
      }
    });
  });
}

function handleSignup(req, res) {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const { username, password } = querystring.parse(body);

    // Read the current users from the file
    fs.readFile('users.json', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('Error reading user data');
      }

      const users = JSON.parse(data);

      // Check if the user already exists
      if (users[username]) {
        res.writeHead(409, { 'Content-Type': 'text/plain' });
        return res.end('Username already exists');
      }

      // Add the new user to the users object
      users[username] = password;

      // Write the updated data back to the file
      fs.writeFile('users.json', JSON.stringify(users), 'utf8', (err) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          return res.end('Error saving user data');
        }

        res.writeHead(201, { 'Content-Type': 'text/plain' });
        res.end('Signup successful, you can now log in');
      });
    });
  });
}

// Initialize the 'users.json' file if it doesn't exist
fs.existsSync('users.json') || fs.writeFileSync('users.json', JSON.stringify({}));

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    serveStaticFile(req, res, "./index.html", "text/html");
  } else if (req.url === "/login" && req.method === "POST") {
    handleLogin(req, res);
  } else if (req.url === "/sign" && req.method === "POST") {
    handleSignup(req, res);
  } else if (req.url === "/sign" && req.method === "GET") {
    serveStaticFile(req, res, "./signup.html", "text/html");
  } else if (req.url === "/login" && req.method === "GET") {
    serveStaticFile(req, res, "./login.html", "text/html");
  }
  else if (req.url === "/hospitals" && req.method === "GET") {
    serveStaticFile(req, res, "./public/hospital.html", "text/html");
  }
  else if (req.url === "/store" && req.method === "GET") {
    serveStaticFile(req, res, "./public/mainstore2.html", "text/html");
  }
  else if (req.url === "/donation" && req.method === "GET") {
    serveStaticFile(req, res, "./public/donation.html", "text/html");
  }
  else if (req.url === "/blog" && req.method === "GET") {
    serveStaticFile(req, res, "./public/blog.html", "text/html");
  }
   else {
    serveStaticAssets(req, res);  // Handle other static assets (CSS, JS, images)
  }
});

server.listen(PORT, () => {
  console.log("Server is running on http://localhost:${PORT}");
});