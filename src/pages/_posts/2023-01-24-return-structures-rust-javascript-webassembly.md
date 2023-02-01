---
title: "Returning data structures from Rust to JavaScript via WebAssembly"
teaser: "Passing structured data between Rust and JavaScript can be done via WebAssembly, but it takes a bit of work."
author: Nicholas C. Zakas
categories:
  - Programming
tags:
  - Rust
  - JavaScript
  - WebAssembly
  - wasm-bindgen
---

Rust has excellent WebAssembly support through the [`wasm-bindgen`](https://crates.io/crates/wasm-bindgen/) crate. Using this crate, you can easily convert Rust code into WebAssembly, making it easy to pass data back and forth between Rust and JavaScript. However, that support is limited to a small number of types, including booleans, numbers, characters, strings, and `Vec`s. For other types, such as `structs`, you'll need to serialize the data and return it as a `JsValue`. 


Passing numeric data back and forth between Rust and JavaScript through WebAssembly works out of the box, but if you want to pass structured data, you'll need to serialize it first. There are three packages you'll need to accomplish this:

1. [`wasm_bindgen`](https://crates.io/crates/wasm-bindgen/) is the default way to create WebAssembly bindings for Rust.
1. [`serde`](https://crates.io/crates/serde) is a general serialization utility that you'll need to ensure your structures can be serialized.
1. [`serde-wasm-bindgen`](https://crates.io/crates/serde-wasm-bindgen) is the serialization logic that works with `wasm-bindgen`.

Here's how these crates look in your `Cargo.toml` file:

```toml
[dependencies]
serde = { version = "1.0", features = ["derive"] }
serde-wasm-bindgen = "0.4"
wasm-bindgen = { version = "0.2", features = ["serde-serialize"] }
```




```rs
pub fn send_to_js() -> JsValue {

    const value = MyStruct {
        value: 42
    };

    serde_wasm_bindgen::to_value(&node).unwrap()
}
```
