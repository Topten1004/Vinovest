import whiteBottle from "./whiteBottle.png";
import goldBottle from "./goldBottle.png";
import blackBottle from "./blackBottle.png";
import plusBottle from "./plusBottle.png";
import { depositTiers, chDepositTiers } from "#localization/constants";
import { languageCodeChina } from "#utils/constants";

export const itemsToRender = [
    {
        id: "starter",
        img: whiteBottle,
        title: "standard.title",
        amount: languageCodeChina ? chDepositTiers.minimum : depositTiers.minimum,
        annual: "standard.annual",
        colors: ["rgb(36, 46, 53)", "rgb(238, 239, 239)"],
        benefits: "standard.benefits",
        featureBasicLabel: "features.label_basic",
        featureProductLabel: "features.label_product",
        featureExclusiveLabel: "features.label_exclusive",
        featuresBasic: [
            { text: "features.basic.basic_1", active: true },
            { text: "features.basic.basic_2", active: true },
            { text: "features.basic.basic_3", active: true },
            { text: "features.basic.basic_4", active: true },
            { text: "features.basic.basic_5", active: true },
        ],
        featuresProduct: [
            { text: "features.product.product_1", active: false },
            { text: "features.product.product_2", active: false },
            { text: "features.product.product_3", active: false },
            { text: "features.product.product_4", active: false },
        ],
        featuresExclusive: [
            { text: "features.exclusive.exclusive_1", active: false },
            { text: "features.exclusive.exclusive_2", active: false },
            { text: "features.exclusive.exclusive_3", active: false },
            { text: "features.exclusive.exclusive_4", active: false },
        ],
    },
    {
        id: "plus",
        img: plusBottle,
        title: "plus.title",
        amount: languageCodeChina ? chDepositTiers.tier2 : depositTiers.tier2,
        annual: "plus.annual",
        colors: ["rgb(36, 46, 53)", "rgb(239, 247, 255)"],
        benefits: "plus.benefits",
        featureBasicLabel: "features.label_basic",
        featureProductLabel: "features.label_product",
        featureExclusiveLabel: "features.label_exclusive",
        featuresBasic: [
            { text: "features.basic.basic_1", active: true },
            { text: "features.basic.basic_2", active: true },
            { text: "features.basic.basic_3", active: true },
            { text: "features.basic.basic_4", active: true },
            { text: "features.basic.basic_5", active: true },
        ],
        featuresProduct: [
            { text: "features.product.product_1", active: true },
            { text: "features.product.product_2", active: true },
            { text: "features.product.product_3", active: false },
            { text: "features.product.product_4", active: false },
        ],
        featuresExclusive: [
            { text: "features.exclusive.exclusive_1", active: false },
            { text: "features.exclusive.exclusive_2", active: false },
            { text: "features.exclusive.exclusive_3", active: false },
            { text: "features.exclusive.exclusive_4", active: false },
        ],
    },
    {
        id: "premium",
        img: goldBottle,
        title: "premium.title",
        amount: languageCodeChina ? chDepositTiers.premium : depositTiers.premium,
        annual: "premium.annual",
        colors: ["rgb(36, 46, 53)", "rgb(239,221,199)"],
        benefits: "premium.benefits",
        featureBasicLabel: "features.label_basic",
        featureProductLabel: "features.label_product",
        featureExclusiveLabel: "features.label_exclusive",
        featuresBasic: [
            { text: "features.basic.basic_1", active: true },
            { text: "features.basic.basic_2", active: true },
            { text: "features.basic.basic_3", active: true },
            { text: "features.basic.basic_4", active: true },
            { text: "features.basic.basic_5", active: true },
        ],
        featuresProduct: [
            { text: "features.product.product_1", active: true },
            { text: "features.product.product_2", active: true },
            { text: "features.product.product_3", active: true },
            { text: "features.product.product_4", active: true },
        ],
        featuresExclusive: [
            { text: "features.exclusive.exclusive_1", active: true },
            { text: "features.exclusive.exclusive_2", active: true },
            { text: "features.exclusive.exclusive_3", active: false },
            { text: "features.exclusive.exclusive_4", active: false },
        ],
    },
    {
        id: "grandCru",
        img: blackBottle,
        title: "grandCru.title",
        amount: languageCodeChina ? chDepositTiers.grandcru : depositTiers.grandcru,
        annual: "grandCru.annual",
        colors: ["rgb(239,221,199)", "rgb(36, 46, 53)"],
        benefits: "grandCru.benefits",
        featureBasicLabel: "features.label_basic",
        featureProductLabel: "features.label_product",
        featureExclusiveLabel: "features.label_exclusive",
        featuresBasic: [
            { text: "features.basic.basic_1", active: true },
            { text: "features.basic.basic_2", active: true },
            { text: "features.basic.basic_3", active: true },
            { text: "features.basic.basic_4", active: true },
            { text: "features.basic.basic_5", active: true },
        ],
        featuresProduct: [
            { text: "features.product.product_1", active: true },
            { text: "features.product.product_2", active: true },
            { text: "features.product.product_3", active: true },
            { text: "features.product.product_4", active: true },
        ],
        featuresExclusive: [
            { text: "features.exclusive.exclusive_1", active: true },
            { text: "features.exclusive.exclusive_2", active: true },
            { text: "features.exclusive.exclusive_3", active: true },
            { text: "features.exclusive.exclusive_4", active: true },
        ],
    },
];

export const chartHeaderDesktop = [
    {
        id: "1",
        text: null,
    },
    {
        id: "2",
        text: languageCodeChina ? chDepositTiers.minimum : depositTiers.minimum,
    },
    {
        id: "3",
        text: languageCodeChina ? chDepositTiers.tier2 : depositTiers.tier2,
    },
    {
        id: "4",
        text: languageCodeChina ? chDepositTiers.premium : depositTiers.premium,
    },
    {
        id: "5",
        text: languageCodeChina ? chDepositTiers.grandcru : depositTiers.grandcru,
    },
    {
        id: "6",
        text: null,
    },
    {
        id: "7",
        text: "standard.annual",
        class: "",
    },
    {
        id: "8",
        text: "plus.annual",
        class: "",
    },
    {
        id: "9",
        text: "premium.annual",
        class: "",
    },
    {
        id: "10",
        text: "grandCru.annual",
    },
];
export const itemsToRenderDesktop = [
    {
        id: "1",
        text: "features.label_basic",
        class: "plan-label",
        checkMarks: null,
    },
    {
        id: "2",
        text: "features.basic.basic_1",
        class: "plan-feature",
        checkMarks: [true, true, true, true],
    },
    {
        id: "3",
        text: "features.basic.basic_2",
        class: "plan-feature",
        checkMarks: [true, true, true, true],
    },
    {
        id: "4",
        text: "features.basic.basic_3",
        class: "plan-feature",
        checkMarks: [true, true, true, true],
    },
    {
        id: "5",
        text: "features.basic.basic_4",
        class: "plan-feature",
        checkMarks: [true, true, true, true],
    },
    {
        id: "6",
        text: "features.basic.basic_5",
        class: "plan-feature",
        checkMarks: [true, true, true, true],
    },
    {
        id: "7",
        text: null,
        checkMarks: null,
    },
    {
        id: "8",
        text: "features.label_product",
        class: "plan-label",
        checkMarks: null,
    },
    {
        id: "9",
        text: "features.product.product_1",
        class: "plan-feature",
        checkMarks: [false, true, true, true],
    },
    {
        id: "10",
        text: "features.product.product_2",
        class: "plan-feature",
        checkMarks: [false, true, true, true],
    },
    {
        id: "11",
        text: "features.product.product_3",
        class: "plan-feature",
        checkMarks: [false, false, true, true],
    },
    {
        id: "12",
        text: "features.product.product_4",
        class: "plan-feature",
        checkMarks: [false, false, true, true],
    },
    {
        id: "13",
        text: null,
        checkMarks: null,
    },
    {
        id: "14",
        text: "features.label_exclusive",
        class: "plan-label",
        checkMarks: null,
    },
    {
        id: "15",
        text: "features.exclusive.exclusive_1",
        class: "plan-feature",
        checkMarks: [false, false, true, true],
    },
    {
        id: "16",
        text: "features.exclusive.exclusive_2",
        class: "plan-feature",
        checkMarks: [false, false, true, true],
    },
    {
        id: "17",
        text: "features.exclusive.exclusive_3",
        class: "plan-feature",
        checkMarks: [false, false, true, true],
    },
    {
        id: "18",
        text: "features.exclusive.exclusive_4",
        class: "plan-feature",
        checkMarks: [false, false, true, true],
    },
];

export const buttonsDesktop = [{ id: "starter" }, { id: "plus" }, { id: "premium" }, { id: "grandCru" }];
