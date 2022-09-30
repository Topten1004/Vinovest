import styled from "styled-components";

export const PrintWireTransferWrapper = styled.div`
    /*  General
      ============================== */
    /* min-width: 1093px; */

    @media all {
        .page-break {
            display: none;
        }
    }

    @media print {
        .page-break {
            display: block;
            page-break-before: always;
        }
    }

    hr {
        box-sizing: content-box;
        height: 0;
        overflow: visible;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin-top: 0;
        margin-bottom: 0;
    }

    p {
        margin-top: 0;
        margin-bottom: 0.5rem;
    }

    body {
        font-family: "VinovestMedium";
        font-size: 11px;
        line-height: 16px;
        letter-spacing: 0.69px;
        color: #242e35;
        background-color: #fff;
        font-weight: 300;
        margin: 0;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: "RoslindaleDisplayCondensed";
        margin: 0;
    }
    h1 {
        font-size: 30px;
        line-height: 42px;
    }
    h2 {
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 32px;
        padding-bottom: 15px;
    }
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }
    a {
        color: inherit;
        text-decoration: none;
        background-color: transparent;
    }

    a:hover {
        color: inherit;
        text-decoration: none;
    }

    .wrapper {
        width: 100%;
        min-width: 650px;
        max-width: 880px;
        margin-top: -50px;
    }

    .wrapper-inner {
        padding-left: 15px;
        padding-right: 15px;
        width: 100%;
        max-width: 1130px;
        margin: 0 auto;
    }
    .flex-container {
        display: flex;
    }
    .justify-content-between {
        justify-content: space-between !important;
    }
    .justify-content-center {
        justify-content: center !important;
    }
    .justify-content-start {
        justify-content: flex-start !important;
    }
    .align-items-center {
        align-items: center !important;
    }
    .header-top {
        display: flex;
        padding-top: 23px;
        padding-bottom: 28px;
    }
    .link_black {
        color: #242e35 !important;
    }
    .top-date {
        width: 75px;
    }
    .head-top-nav {
        line-height: 12px !important;
    }
    .head-top-nav li a {
        line-height: 11px !important;
    }
    ol,
    ul {
        list-style: none outside none;
        padding: 0;
        margin: 0;
    }
    .head-top-nav li + li::before {
        content: "";
        border-left: 1px solid #242e35;
        padding-left: 7px;
        margin-left: 7px;
        line-height: 11px !important;
    }
    .head-top-nav-br {
        border-left: 1px solid #242e35;
        border-right: 1px solid #242e35;
    }
    .align-self {
        align-self: flex-end !important;
    }

    .main-header {
        width: 100%;
        max-width: 920px;
        margin: 0 auto;
        padding-top: 20px;
    }
    .page-content {
        width: 100%;
        max-width: 920px;
        margin: 0 auto;
        padding-top: 40px;
    }
    .page-content {
        font-family: "VinovestMedium";
        font-size: 14px;
        line-height: 21px;
        letter-spacing: 0.005em;
        text-align: left;
        font-weight: 500;
        font-style: normal;
    }
    .page-content a {
        color: #a86d37;
        text-decoration: none;
    }
    .page-content {
        margin-bottom: 50px;
    }
    .head-nav {
        padding-bottom: 18px;
        border-bottom: 2px solid #242e35;
    }
    .break-number1 {
        word-break: break-all !important;
    }
    .w-60 {
        width: 67px;
    }
    .txt_mono {
        font-family: "VinovestMedium" !important;
        font-size: 11px !important;
        line-height: 150% !important;
        letter-spacing: 0.025em;
    }
    .account-statement {
        flex-direction: column;
    }
    .left-column {
        -webkit-print-color-adjust: exact;
        background-color: #c5d5e4 !important;
        width: 470px;
        color: #3c400c;
        padding: 36px 36px 26px;
    }
    .left-column-yellow {
        -webkit-print-color-adjust: exact;
        background-color: #e0e5cd !important;
    }
    .left-column h2 {
        font-family: "RoslindaleDisplayCondensed";
        font-style: normal;
        font-weight: 500;
        font-size: 64px;
        line-height: 84px;
    }
    .left-column h4 {
        padding-top: 25px;
        padding-bottom: 13px;
    }
    .transfer-text {
        padding-top: 5px;
        font-family: "VinovestMedium";
        font-size: 16px;
        line-height: 26px;
    }
    .transfer-text h3 {
        padding-top: 65px;
        padding-bottom: 12px;
        font-family: "RoslindaleDisplayCondensed";
        font-weight: 500;
        font-size: 20px;
        line-height: 32px;
    }
    .transfer-text a {
        color: #3c400c;
        text-decoration: none;
        font-weight: normal;
        font-size: 12px;
        line-height: 19px;
        padding-bottom: 5px;
        display: block;
    }
    .right-column-wrapper {
        margin-left: 40px;
        margin-bottom: 100px;
    }
    .right-column {
        width: 275px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }
    .right-column-wrapper .large-column {
        width: 400px;
    }
    .right-column h3 {
        padding-top: 30px;
        font-family: "RoslindaleDisplayCondensed";
        font-style: normal;
        font-weight: 500;
        font-size: 32px;
        line-height: 41px;
        width: 275px;
    }
    .right-column h5 {
        font-family: "VinovestMedium" !important;
        color: #5b646b;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 18px;
        letter-spacing: 0.025em;
        text-transform: uppercase;
        padding-top: 30px;
        width: 275px;
    }
    .input-lines {
        padding-top: 30px;
    }
    .right-column .gfield_label {
        font-family: "VinovestMedium" !important;
        color: #242e35;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 18px;
        letter-spacing: 0.025em;
        text-transform: uppercase;
        display: block;
    }
    textarea {
        min-height: 150px;
    }
    :focus {
        outline: none;
    }
    .gfield_label textarea:focus,
    .gfield_label textarea,
    .gfield_label input:focus,
    .gfield_label input {
        height: 50px;
        background: none;
        box-shadow: none;
        width: 100%;
        margin-bottom: 12px;
        box-shadow: none;
        border: none;
        font-size: 20px;
        line-height: 36px;
        letter-spacing: 0.005em;
        color: #242e35;
        outline: none;
        font-weight: 400;
    }
    .right-column .input-lines_txt {
        border: none;
        font-size: 20px;
        line-height: 36px;
        letter-spacing: 0.005em;
        color: #242e35;
    }
    .right-column span {
        font-size: 20px;
        line-height: 36px;
        letter-spacing: 0.005em;
        color: #242e35;
        display: inline-block;
        min-height: 25px;
        width: 300px;
    }
    .right-column p {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 21px;
        letter-spacing: 0.005em;
        color: #5b646b;
        max-width: 295px;
    }
    .right-column .txt-info {
        max-width: 100%;
        padding-top: 40px;
    }
    .field-bg {
        background: #fae8d1 !important;
        -webkit-print-color-adjust: exact;

        padding: 0px 7px;
        margin-top: 10px;
    }
    .upper-txt {
        text-transform: uppercase !important;
    }
    .column-small {
        max-width: 190px;
        width: 100%;
    }
    .column-small h4 {
        font-family: "VinovestMedium";
        font-weight: 500;
        padding-top: 7px;
    }
    .table-section sup {
        line-height: 20px;
        padding-bottom: 10px;
    }
    .stat-1 {
    }
    .stat-1 th {
        position: relative;
        padding-top: 15px;
    }
    .sup1:after {
        content: "1";
        font-family: "VinovestMedium";
        font-size: 11px;
        position: absolute;
        right: -8px;
        top: 0px;
    }
    .sup2:after {
        content: "2";
        font-family: "VinovestMedium";
        font-size: 11px;
        position: absolute;
        right: -8px;
        top: 0px;
    }
    .sup3:after {
        content: "3";
        font-family: "VinovestMedium";
        font-size: 11px;
        position: absolute;
        right: -8px;
        top: 0px;
    }
    .holdings-table {
        padding-top: 20px;
    }
    .holdings-table h2 {
        padding-bottom: 0px;
    }
    .table-section {
    }
    .table-section th {
        font-family: "VinovestMedium";
        font-size: 11px;
        line-height: 150%;
        letter-spacing: 0.025em;
        text-transform: uppercase;
        text-align: right;
        border-bottom: 1px solid #caccce;
        padding-bottom: 12px;
        vertical-align: bottom;
        font-weight: normal;
        padding-left: 5px;
    }
    .table-section th:first-child {
        text-align: left;
        width: 400px;
        padding-left: 0px;
    }
    table {
        border-collapse: collapse;
        width: 100%;
    }
    .table-section td {
        font-family: "VinovestMedium";
        font-size: 14px;
        line-height: 150%;
        letter-spacing: 0.025em;
        text-align: right;
        border-bottom: 1px solid #caccce;
        padding-bottom: 12px;
        padding-top: 12px;
        vertical-align: middle;
        padding-left: 5px;
        font-weight: 500;
        width: 185px;
    }
    .table-section td:first-child {
        text-align: left;
        width: 400px;
        padding-left: 0px;
    }
    .table-section tr:last-child td {
        border-bottom: none;
    }
    .txt-18 {
        font-size: 18px !important;
        letter-spacing: 0.005em;
    }
    .footer {
        display: flex;
        font-family: "VinovestMedium";
        font-size: 14px;
        line-height: 150%;
        color: #767a7f;
        letter-spacing: 0.005em;
        font-weight: 500;
        padding-bottom: 35px;
    }
    .txt12 {
        padding-right: 30px;
    }

    /* --- Page 2 ---- */
    .statement-2 {
        padding-bottom: 5px;
    }
    .transactions-table {
        padding-top: 25px;
        padding-bottom: 30px;
    }
    .transactions-table .table-section {
        padding-bottom: 28px;
    }
    .transactions-table .table-section td {
        text-align: left;
        padding-right: 5px;
        width: auto;
    }
    .transactions-table .table-section td:first-child {
        width: auto;
    }
    .transactions-table .table-section th:first-child {
        width: auto;
    }
    .transactions-table .table-section td:last-child {
        text-align: right;
        padding-right: 0px;
    }
    .transactions-table .table-section th {
        text-align: left;
        padding-right: 5px;
    }
    .transactions-table .table-section th:last-child {
        text-align: right;
        padding-right: 0px;
    }
    .row-section {
        border-top: 1px solid #caccce;
        padding-top: 20px;
        padding-bottom: 20px;
    }
    .row-section ol {
        list-style-type: decimal;
        list-style-position: inside;
    }

    /* --- Page 3 ---- */
    .statement-3 {
        padding-bottom: 5px;
    }
    .txt-small-12 {
        font-size: 12px;
        line-height: 19px;
        letter-spacing: 0.005em;
    }
    .txt-small-12 a {
        color: inherit;
    }

    /* --- Page 4 ---- */
    .trade-id h2 {
        padding-bottom: 20px;
    }
    .wine-purchase {
        padding-bottom: 5px !important;
    }
    .wine-purchase .table-section {
        padding-top: 0px;
        padding-bottom: 0;
    }
    .wine-purchase .transactions-table {
        padding-bottom: 0;
    }
    .wine-purchase .table-section td {
        padding-bottom: 16px;
        padding-top: 16px;
        padding-right: 8px;
        vertical-align: top;
    }
    .wine-purchase .table-section td:first-child {
        width: 270px;
    }
    .wine-purchase .trade-id {
        padding-top: 35px;
    }
    .wine-purchase .table-section td {
        max-width: 140px;
    }
    .row-2col-section {
        display: flex;
    }
    .left-box {
        padding-top: 55px;
    }
    .right-box {
        width: 100%;
        max-width: 310px;
    }
    .txt-small-11 {
        font-size: 11px !important;
        line-height: 15px !important;
    }

    /* --- Page 5 ---- */
    .wine-liquidation {
        min-width: 850px;
    }
    .pad_l {
        padding-left: 5px;
    }
    .wine-liquidation .table-section td:first-child {
        width: 320px;
        padding-right: 8px;
        min-width: 280px;
    }
    .wine-liquidation .right-box .upper-txt {
        width: auto !important;
        padding-right: 8px !important;
        min-width: 50px !important;
    }
    .wine-liquidation .table-section td:last-child {
        width: 100px;
    }
    .wine-liquidation .table-section td:nth-last-child(2) {
        width: 100px;
    }
    .bottom-align {
        padding-top: 160px;
    }

    @media (max-width: 991px) {
        .wine-purchase .table-section td:first-child {
            width: auto;
        }
    }
    @media screen and (max-width: 767px) {
        .table-section td {
            font-size: 13px;
        }
        .table-section th {
            font-size: 10px;
        }

        .txt-18 {
            font-size: 13px !important;
            letter-spacing: 0.005em;
        }
        .txt12 {
            font-size: 12px !important;
            padding-right: 20px !important;
        }
        .right-box {
            max-width: 280px;
        }
        .right-box td {
            width: auto;
        }
    }
`;

export const AlertAdvisors = styled.p`
    text-align: center;
    margin-top: 40px;
    line-height: 2;
    font-size: 12px;
    margin-top: auto;
    border-bottom: 2px solid #242e35;
    padding-bottom: 10px;
    a {
        text-decoration: none;
        color: #0066cc;
    }
`
