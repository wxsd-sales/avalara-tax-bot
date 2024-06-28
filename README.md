# Avalara Tax Bot

**Webex bot for interfacing with Avalara's communications tax engine API.**

This application is designed to provide tax estimation capabilities by interfacing with the Avalara communications tax engine API. The bot leverages the Fastify web framework and the Webex SDK to send out Adaptive Cards and return results in various formats such as tabular, CSV, and JSON.

<p align="center">
  <table>
  <tr>
    <td rowspan="3"><img src="https://github.com/wxsd-sales/avalara-tax-bot/assets/6129517/9c6ef9ba-6837-4d22-aaf8-f8b3eea450dc" alt="avalara-tax-bot--main-card"/></td>
    <td><img src="https://github.com/wxsd-sales/avalara-tax-bot/assets/6129517/460bfae3-3fbc-4237-b30b-ef5922aca337" alt="avalara-tax-bot-tabular"/></td>
  </tr>
  <tr>
    <td><img src="https://github.com/wxsd-sales/avalara-tax-bot/assets/6129517/2800bbfb-0a19-44da-828f-bf066d2a8359" alt="avalara-tax-bot-csv"/></td>
  </tr>
  <tr>
    <td><img src="https://github.com/wxsd-sales/avalara-tax-bot/assets/6129517/873afd3d-ad7d-4cb6-bc0f-e9d431d91edb" alt="avalara-tax-bot-json"/></td>
  </tr>
</table>
</p>

<!-- ⛔️ MD-MAGIC-EXAMPLE:START (TOC:collapse=true&collapseText=Click to expand) -->
<details>
<summary>Table of Contents (click to expand)</summary>
    
- [Overview](#overview)
- [Setup](#setup)
- [Demo](#demo)
- [Disclaimer](#disclaimer)
- [License](#license)
- [Support](#support)

</details>
<!-- ⛔️ MD-MAGIC-EXAMPLE:END -->

## Overview

The Avalara Tax Bot provides an efficient way to estimate communication taxes by integrating with Avalara's API. It uses Fastify for the web server for command execution, sending results back to users via Adaptive Cards on Webex via the JS SDK. The results can be formatted in various ways including tabular, CSV, and JSON, making it versatile for different use cases.

## Setup

These instructions assume that you have:

- Administrator access to an Org's Avalara Tax account and ability to create Webex Bot.
- [Docker installed](https://docs.docker.com/engine/install/) and running on a Windows (via WSL2), macOS, or Linux machine.

Open a new terminal window and follow the instructions below to set up the project locally for development/demo.

1. Clone this repository and change directory:

   ```
   git clone https://github.com/wxsd-sales/avalara-tax-bot && cd avalara-tax-bot
   ```

2. Copy `.env.example` file as `.env`:

   ```
   cp .env.example .env
   ```

3. Review and follow the [Creating a Webex Bot](https://developer.webex.com/docs/bots#creating-a-webex-bot) guide.
   Take note of your Bot ID and Bot access token. Assign these values to the `WEBEX_BOT_EMAIL`, `WEBEX_BOT_ID` and `WEBEX_BOT_TOKEN` environment variables within the `.env` file respectively.

5. Set the Avalara API credentials in the `.env` file:
   ```
   AVALARA_USERNAME=<your-avalara-username>
   AVALARA_PASSWORD=<your-avalara-password>
   AVALARA_CLIENT_ID=<your-avalara-client-id>
   AVALARA_CLIENT_PROFILE_ID=<your-avalara-client-profile-id>
   ```

6. Set other environment variables as needed in the `.env` file.

7. Start the application using:
   ```
   docker-compose up
   ```

Lastly, send any message to the bot you just created to get a resppnse. You can restrict who can use the bot by setting the value for `WEBEX_PERSON_EMAIL_REGEX_BASE64`
in `.env` file.

## Demo

A demo is not available at this time.

## Disclaimer

Everything included in this repository is for demo and Proof of Concept (PoC) purposes only. Use of the PoC is solely
at your own risk. This project may contain links to external content, which we do not warrant, endorse, or assume
liability for. This project is for Cisco Webex use-case, but is not official Cisco Webex branded project.

## License

[MIT](./LICENSE)

## Support

Please reach out to the WXSD team at [wxsd@external.cisco.com](mailto:wxsd@external.cisco.com?cc=ashessin@cisco.com&subject=Avalara%20Tax%20Bot) or contact me on Webex (ashessin@cisco.com).
