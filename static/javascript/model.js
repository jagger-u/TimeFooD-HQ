class ContainerGroup {
    constructor(containerGroupJoin, selectionClass) {
        this.containerGroupJoin = containerGroupJoin;
        this.selectionClass = selectionClass;
        this.group = this.containerGroupJoin.selectAll(`#${this.selectionClass}-g`);
        this.groupData = this.group.data([null]);
        this.groupEnter = this.groupData.enter();
        this.groupJoin = this.groupEnter.append('g').attr('id', `${this.selectionClass}-g`);
        this.groupMerge = this.groupEnter.merge(this.groupData);
        this.groupExit = this.groupData.exit().remove();
    }
}

class GeneralUpdatePattern {
    constructor(selectionClass, dataToBind, toAppend, containerGroupJoin) {
        this.selectionClass = selectionClass;
        this.dataToBind = dataToBind;
        this.toAppend = toAppend;
        this.container = new ContainerGroup(containerGroupJoin, selectionClass);

        this.itself = this.container.groupData.merge(this.container.groupJoin).selectAll(`.${this.selectionClass}`).data(this.dataToBind);
        this.enter = this.itself.enter();
        this.join = this.enter.append(this.toAppend).attr('class', `${this.selectionClass}`);
        this.merge = this.itself.merge(this.join);
        this.exit = this.itself.exit();
    }
}

class axisFrame {
    constructor(selectionClass, axisFunc, scaling, containerGroupJoin) {
        this.selectionClass = selectionClass;
        this.scaling = scaling;
        this.container = new ContainerGroup(containerGroupJoin, selectionClass);

        this.axis = axisFunc(this.scaling);
        this.axisGroup = this.container.groupData.select(`.${this.selectionClass}`);

        this.enter = this.container.groupJoin.append('g').attr('class', this.selectionClass);
        this.merge = this.axisGroup.merge(this.enter);
        this.mergeCall = this.merge.call(this.axis);
        this.exit = this.axisGroup.exit();
    }
}

class DayPeriod {
    constructor(year, month, day, wakeupHour, wakeupMin, workout, times, titles, total) {
      this.year = year;
      this.month = month;
      this.day = day;
      this.wakeupHour = wakeupHour;
      this.wakeupMin = wakeupMin;
      this.workout = workout;
      this.times = times;
      this.titles = titles;
      this.total = total;
    }
  }
  