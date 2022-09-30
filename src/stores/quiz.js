import { observable, computed, action, toJS } from "mobx";

export class QuizStore {
    static build(rootStore, api) {
        return new QuizStore(rootStore, api);
    }

    @observable investingStyle = "";
    @observable consideredStartingInvestment = 0;
    @observable quizData = {};

    constructor(rootStore, api) {
        this.root = rootStore;
        this.api = api;
    }

    @computed get quizDataAsJS() {
        return toJS(this.quizData);
    }

    @action setInvestingStyle(newStyle) {
        this.investingStyle = newStyle;
    }
    @action setConsideredStartingInvestment(amount) {
        this.consideredStartingInvestment = amount;
    }
    @action saveQuizData(data) {
        this.quizData = data;
    }
    @action resetState() {
        this.investingStyle = "";
        this.quizData = {};
    }
}
