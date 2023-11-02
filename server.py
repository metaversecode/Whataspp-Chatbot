from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)
@app.route("/", methods=["GET", "POST"])
def index():
      if request.method == "POST":
        name = request.form["name"]
        return f"Hello, {name}!"

if __name__ == "__main__":
    app.run(debug=True)