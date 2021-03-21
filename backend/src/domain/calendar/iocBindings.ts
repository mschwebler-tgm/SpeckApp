const calendarBindings = {
    CalendarService: Symbol.for('CalendarService'),
    CalendarRepositoryFactory: Symbol.for('CalendarRepositoryFactory'),
    EventService: Symbol.for('EventService'),
    EventRepositoryFactory: Symbol.for('EventRepositoryFactory'),
    UserRepositoryFactory: Symbol('UserRepositoryFactory'),
};

export default calendarBindings;
