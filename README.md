# Darkpool :sparkles:

Block explorer for Darkpool

## Projects running on mainnets

[Explore DP Hub with Darkpool](http://darkpool.profitlock.io)

## How to run block explorer 

1. Copy `default_settings.json` to `settings.json`.
2. Update the RPC and LCD URLs.
3. Update Bech32 address prefixes.
4. Update genesis file location.

### Requirements

* [Meteor v1.10.x](https://www.meteor.com/install)

### Run in local

```sh
meteor npm install --save
meteor --settings settings.json
```

### Run in production

```sh
./build.sh
```

It will create a packaged Node JS tarball in `Linux x86_64` architecture at `../output`. Deploy that packaged Node JS project with process manager like [PM2](https://github.com/Unitech/pm2) or [Phusion Passenger](https://www.phusionpassenger.com/library/walkthroughs/basics/nodejs/fundamental_concepts.html). 

You will need to have [MongoDB >= 4.x](https://docs.mongodb.com/manual/administration/install-on-linux/) installed and [setup environment variables](https://guide.meteor.com/deployment.html#environment) correctly in order run in production. For more details on how to deploy a Meteor application, please refer to the offical documentation on [Custom Deployment](https://guide.meteor.com/deployment.html#custom-deployment).

---
## Donations :pray:

The Big Dipper is always free and open. Anyone can use to monitor available Cosmos hub or zones, or port to your own chain built with Cosmos SDK. We welcome any supports to help us improve this project.

DAP: `dx01xhxvgll3s972dmc9zemj4lv0nvtsdkfj3y9njs`\
BTC: `12hoheXpFHUWzpkPgA9XuR4s8DMogkjHmg`\
ETH: `0x12D3C114dd98DA9E00E0F405d4BFD18DD2236eEd`

And by downloading and using [Brave](https://brave.com/big517).
