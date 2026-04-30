---
title: "Requirements Gathering"
course: "OOD"
topic: "OOD"
source: "/home/ayush/OOD-Design-Principles/Restraunt___Technical_Interview_Prep.html"
---
In this chapter, we will explore the design of a Restaurant Management System. The goal is to create classes that represent the system’s essential components, such as menus, reservations, and tables. We will develop a system that supports critical functions like booking reservations, managing orders, and assigning tables, ensuring the design is both straightforward and flexible for future enhancements.

![Image represents a simple line drawing of a restaurant setting.  The central focus is a round table covered with a tablecloth, set for two. On the table is a small, triangular 'RESERVED' sign, a vase with a single flower, and a plate with a glass beside it. Two chairs are positioned on either side of the table. In the background, two more tables with identical tablecloths and chairs are visible, each under a hanging light fixture. The overall style is minimalist, using only black lines on a light gray background to depict the scene.  There are no URLs or parameters present in the image. The arrangement suggests a formal restaurant setting with a table specifically reserved for patrons.](/assets/images/ood/ood/e1a7d84dac8c14e4.webp)

## Requirements Gathering

The first step in designing a Restaurant Management System is to clarify the requirements and define the scope. Here’s an example of a typical prompt an interviewer might present:

“Picture yourself planning a dinner outing on a Friday night. You call the restaurant to reserve a table for your group, check available times, and secure a spot. When you arrive, the staff assigns your party to the reserved table, takes your order, and later presents the bill. Behind the scenes, the system is smoothly handling table reservations, tracking orders, and calculating costs. Now, let’s design a Restaurant Management System that manages all of this.”

### Requirements clarification

Here is an example of how a conversation between a candidate and an interviewer might unfold:

**Candidate**: Does the system allow customers to make and manage their reservations? **Interviewer**: Yes, customers can book tables for a future date and time based on availability.

**Candidate**: How does the system determine if a table is available for a reservation? **Interviewer**: It checks for a table that fits the party size and is free at the requested time. Each reservation reserves a table for exactly one hour, so it’s available if no other booking overlaps with that hour.

**Candidate**: Does the system let customers cancel a reservation after making it? **Interviewer**: Yes, customers can cancel reservations.

**Candidate**: When a party with a reservation arrives, do they automatically get their reserved table? **Interviewer**: Yes, they do. They arrive with their name, and the system uses it to find their reservation, which already has a table assigned to it.

**Candidate**: What happens when a walk-in party arrives for dine-in without prior reservation? **Interviewer**: The system should assign walk-in parties to tables based on current availability and their party size.

**Candidate**: Does the system allow orders to be altered or removed after they’re placed? **Interviewer**: Yes, you can remove items or adjust their quantities.

**Candidate**: Are there rules for splitting the bill at checkout? **Interviewer**: For now, just present a single total bill amount.

### Requirements

Based on the questions and answers, we can now list the functional requirements for our restaurant management system.

**Reservations**

- Customers can book tables for a future date and time based on availability.
- Each reservation reserves a table for exactly one hour.
- The system checks if a table is free at the requested time with no overlapping bookings.
- The system assigns a table to a reservation, and customers get it when they arrive using their name.
- Customers can cancel reservations.

**Walk-in seating**

- The system assigns walk-in parties to tables based on current availability and party size.

**Order management**

**Billing**

- The system presents a single total bill amount at checkout.

Below are the non-functional requirements:

- The system should handle increased traffic during busy periods (e.g., weekend evenings) without performance degradation, supporting concurrent users seamlessly.

With these requirements, we are ready to model the objects for the core system.

## Identify Core Objects

Let’s identify the core objects of the restaurant management system.

## Design Class Diagram

You’re set to dive into the heart of the object-oriented design interview: crafting classes and interfaces, shaping data and state through attributes, wrapping logic in methods, and linking your classes with clear relationships.

Below, we detail each class, its purpose, and its responsibilities, ensuring a clear separation of concerns.

Below is the representation of this class.

The UML diagram below illustrates this structure.

### Table

The Table class models restaurant tables. Some of the attributes, like capacity and tableId, rarely change. But other attributes, like reservations and orderedItems, associated with the table represent current-state data that changes over time.

Its purpose is to oversee a table’s current use, tying into the Layout class for availability checks and the OrderItem class to handle what’s being served. It includes methods to add or remove orders, tally up bills, and check availability at specific times.

Here is the representation of this class.

![Image represents a class diagram for a `Table` class in an object-oriented design.  The diagram shows the class name `Table` at the top, enclosed in a box with rounded corners and a 'C' symbol indicating it's a class. Inside the box, the upper section lists the class's attributes: `int tableId`, `int capacity`, `Map<LocalDateTime, Reservation> reservations`, and `Map<MenuItem, List<OrderItem>> orderedItems`. These represent the table's ID, seating capacity, a map of reservation times to Reservation objects, and a map of menu items to lists of ordered items, respectively. The lower section lists the class's methods: a constructor `Table(int tableId, int capacity)`, methods to add and remove orders (`addOrder`, `removeOrder`), methods to add and remove reservations (`addReservation`, `removeReservation`), a method to check availability at a given time (`isAvailableAt`), and a method to calculate the total bill amount (`calculateBillAmount`).  No connections to other classes are shown; the diagram focuses solely on the internal structure and functionality of the `Table` class.](/assets/images/ood/ood/805312f2de6317de.webp)

### Layout

The Layout class oversees all restaurant tables, organizing them by ID and capacity to pinpoint the right one for each booking. Its purpose is to streamline table assignments, working with ReservationManager to match parties to available tables and relying on Table to confirm free slots. It handles this by finding a table that fits the party size and is available at the requested time, keeping the process efficient.

**Design choice:** We isolate table organization in the Layout class to optimize assignment efficiency and separate it from menu and order logic managed by the Menu and Table classes. Alternatively, integrating table assignment into the Restaurant class could simplify the design but would overburden its facade role, mixing high-level coordination with low-level table management.

Below is the representation of the Layout class.

![Image represents a class diagram for a `Layout` class in an object-oriented design.  The diagram shows the `Layout` class, denoted by a class symbol 'C' and the class name 'Layout'. Inside the class, there are two private member variables: `tablesById`, a `Map` mapping integers (presumably table IDs) to `Table` objects; and `tablesByCapacity`, a `SortedMap` mapping integers (table capacities) to `Set`s of `Table` objects.  Below the member variables, there are two public methods: a constructor `Layout(int[] tableCapacities)` that takes an array of integers representing table capacities as input; and a method `findAvailableTable(int partySize, LocalDateTime reservationTime)` that takes a party size (integer) and a reservation time (`LocalDateTime`) as input and returns a `Table` object.  No connections to other classes are explicitly shown in this diagram; the focus is solely on the internal structure and methods of the `Layout` class.](/assets/images/ood/ood/7f17cd1b42ef0136.webp)

### OrderItem

![Image represents a UML class diagram showcasing the `OrderItem` class and an enumeration `Status`.  The `OrderItem` class, denoted by a 'C' in a circle, has two private member variables: `MenuItem item` and `Status status`.  It also defines a constructor `OrderItem(MenuItem item)` and three public methods: `sendToKitchen()`, `deliverToCustomer()`, and `cancel()`. These methods likely manage the lifecycle of an order item. Separately, the `Status` enumeration, indicated by an 'E' in a circle, lists the possible states of an order item: `PENDING`, `SENT_TO_KITCHEN`, `DELIVERED`, and `CANCELED`.  There is no explicit connection drawn between `OrderItem` and `Status` in the diagram, implying a relationship where `OrderItem` uses the `Status` enum to track its state, but this relationship is not visually represented by lines or arrows.](/assets/images/ood/ood/320ced6b3606bf70.webp)

### ReservationManager

The ReservationManager class handles reservation scheduling by finding available times, creating reservations, and processing cancellations. It stores all Reservation objects and uses a reference to the Layout class to manage table assignments. This reference enables the class to verify table availability and assign suitable tables for each reservation based on party size and time.

![Image represents a UML class diagram depicting a `ReservationManager` class.  The class is denoted by the 'C' symbol and the name 'ReservationManager'.  It contains two private member variables: `reservations`, a set of `Reservation` objects, and `layout`, an object of type `Layout`.  The class further defines four public methods: a constructor `ReservationManager(Layout layout)` that takes a `Layout` object as input; `findAvailableTimeSlots(LocalDateTime rangeStart, LocalDateTime rangeEnd, int partySize)`, which returns an array of `LocalDateTime` objects representing available time slots within a specified range and for a given party size; `createReservation(String partyName, int partySize, LocalDateTime desiredTime)`, which creates a new reservation; and `removeReservation(String partyName, int partySize, LocalDateTime reservationTime)`, which removes an existing reservation.  No information flow is explicitly shown beyond the method parameters and return types.](/assets/images/ood/ood/60c5bd5fd097314a.webp)

### Reservation

The Reservation class represents a single booking managed by the ReservationManager class, storing the party name, number of people, reservation time, and assigned table. It serves to hold all details of a reservation, enabling the ReservationManager class to schedule and cancel bookings effectively.

![Image represents a class diagram depicting a `Reservation` class.  The diagram is a rectangular box with a large 'C' in a circle in the upper left corner, indicating a class.  To the right of the 'C', the class name 'Reservation' is displayed. Below the class name, the class's attributes are listed. Each attribute is preceded by a minus sign within a square, indicating private visibility.  The attributes are: `partyName` of type `String`, `partySize` of type `int`, `time` of type `LocalDateTime`, and `assignedTable` of type `Table`.  There are no methods shown in this diagram, only the attributes and their data types.  No connections or information flow to or from other classes is depicted; the diagram solely focuses on the internal structure of the `Reservation` class.](/assets/images/ood/ood/5a4ced69529ad68b.webp)

The class is contained within ReservationManager as one of its entries, maintaining a structured and accessible set of reservation data.

### Restaurant

The Restaurant class serves as the primary interface and facade for the restaurant management system. It coordinates core user-facing operations, such as managing reservations, assigning tables, processing orders, and handling checkout.

It simplifies access to these features by delegating tasks to other classes:

- The class relies on ReservationManager to schedule and cancel reservations.
- The class uses Layout through ReservationManager to identify available tables for assignments.
- The class depends on Menu to supply items for orders.
- The class directs order and billing actions to the Table for processing.

This delegation keeps the Restaurant class focused and manageable, organizing the system into distinct components that ensure clarity and ease of maintenance through a structured use of composition.

**Design choice:** We structure the Restaurant as a facade to unify system operations, delegating tasks to maintain a clean interface and modularity. We can design the Restaurant class as a central controller managing all logic internally, but that would increase its complexity and reduce scalability by centralizing responsibilities.

![Image represents a class diagram for a `Restaurant` class in an object-oriented design.  The diagram shows the `Restaurant` class, denoted by a class symbol 'C', with the class name 'Restaurant' at the top.  Inside the class, there are four private attributes: `String name`, `Menu menu`, `Layout layout`, and `ReservationManager reservationManager`.  Below the attributes, the class defines several public methods. These include `findAvailableTimeSlots`, which takes a start time, end time, and party size as input and returns an array of available `LocalDateTime` objects.  There are also methods to create scheduled and walk-in reservations (`createScheduledReservation` and `createWalkInReservation`), remove reservations (`removeReservation`), order items (`orderItem`), cancel items (`cancelItem`), and calculate the table bill (`calculateTableBill`).  The `createScheduledReservation` method takes a party name, party size, and reservation time as parameters and returns a `Reservation` object. The `createWalkInReservation` method takes a party name and party size as parameters and returns a `Reservation` object. The `removeReservation` method takes a party name, party size, and reservation time as parameters. The `orderItem` and `cancelItem` methods take a `Table` object, a `Menultem` object, and a quantity as parameters. The `calculateTableBill` method takes a `Table` object as a parameter and returns a `BigDecimal` representing the bill amount.  All methods are clearly defined with their return types and parameters.](/assets/images/ood/ood/b262ec86568596e0.webp)

Next, we’ll connect these objects in a class diagram to visualize their relationships.

### Complete Class Diagram

Below is the complete class diagram of our restaurant management system.

![Image represents a class diagram illustrating the object-oriented design of a restaurant reservation system.  The top-level class, `Restaurant`, contains a `ReservationManager`, `Menu`, and `Layout` as attributes.  The `ReservationManager` manages a set of `Reservation` objects and interacts with the `Layout` to find available tables.  The `Layout` class contains a `Map` of tables by ID and a `SortedMap` of tables by capacity, allowing efficient table searching.  The `Reservation` class stores information about a reservation, including the party name, size, time, and assigned table.  The `Menu` class manages a `Map` of `Menultem` objects, each with a name, description, price, and category.  The `Table` class stores table information, including its ID, capacity, reservations, and ordered items (a `Map` of `Menultem` to a list of `OrderItem`).  Finally, the `OrderItem` class represents an item ordered, linking to a `Menultem` and tracking its status.  Arrows indicate dependencies and interactions, for example, `ReservationManager` uses `Layout` to find tables, and `Table` uses `Menu` to manage ordered items.  The methods listed within each class describe their functionalities, including creating and removing reservations, managing orders, and calculating bills.](/assets/images/ood/ood/8b090c22875ce901.webp)

With this structure in place, let’s move on to implement the code that brings this design to life.

## Code - Restaurant Management System

In this section, we’ll implement the core functionalities of the Restaurant Management System, focusing on key areas such as managing menu items, scheduling and canceling reservations, assigning tables for bookings and walk-ins, and processing orders with billing through a table-based system.

The Table class represents a restaurant table, storing its fixed properties, such as tableId and capacity, while maintaining its bookings and orders by updating reservations and orderedItems. Its purpose is to manage a table’s reservations and orders, using Layout to confirm available time slots and OrderItem to provide price and status details.

Below is the implementation of this class.

```java
// Represents a table in the restaurant with its properties and current state
public class Table {
    // immutable properties
    private final int tableId;
    private final int capacity;

    // current state
    private final Map<LocalDateTime, Reservation> reservations = new HashMap<>();
    private final Map<MenuItem, List<OrderItem>> orderedItems = new HashMap<>();

    public Table(int tableId, int capacity) {
        this.tableId = tableId;
        this.capacity = capacity;
    }

    // Calculates the total bill amount for all ordered items at this table
    public BigDecimal calculateBillAmount() {
        return orderedItems.values().stream()
                .flatMap(List::stream)
                .map(OrderItem::getItem)
                .map(MenuItem::getPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    // Adds multiple orders of the same menu item to the table
    public void addOrder(MenuItem item, int quantity) {
        for (int i = 0; i < quantity; i++) {
            addOrder(item);
        }
    }

    // Adds a single menu item to the table's order
    public void addOrder(MenuItem item) {
        List<OrderItem> orderItems = orderedItems.get(item);
        if (orderItems == null) {
            orderItems = new ArrayList<>();
            orderedItems.put(item, orderItems);
            orderItems.add(new OrderItem(item));
        } else {
            orderItems.add(new OrderItem(item));
        }
    }

    // Removes a menu item from the table's order
    public void removeOrder(MenuItem item) {
        List<OrderItem> orderItems = orderedItems.get(item);
        if (orderItems != null) {
            orderItems.remove(0);
            if (orderItems.isEmpty()) {
                orderedItems.remove(item);
            }
        }
    }

    // Checks if the table is available at a specific time
    public boolean isAvailableAt(LocalDateTime reservationTime) {
        return !reservations.containsKey(reservationTime);
    }

    // Adds a reservation to this table
    public void addReservation(Reservation reservation) {
        reservations.put(reservation.getTime(), reservation);
    }

    // Removes a reservation from this table for a specific time
    public void removeReservation(LocalDateTime reservationTime) {
        reservations.remove(reservationTime);
    }

    // getter methods are omitted for brevity
}
```

The class uses a Map with reservation times as keys to store reservations. This setup enables quick availability checks through the isAvailableAt method. It also uses a separate Map with MenuItem keys to manage orderedItems. This structure supports the addOrder method to include items, the removeOrder method to remove them, and the calculateBillAmount method for billing.

With tables in place, let’s organize them efficiently using Layout.

The Layout class represents the seating arrangement of the entire restaurant, managing all tables to support efficient assignments for reservations and walk-ins. It organizes tables using two indexing methods:

- **Tables by ID**: Stored in a Map (tablesById) with each table’s ID as the key. This method allows fast retrieval of a table by its unique identifier during operations.
- **Tables by Capacity**: Stored in a SortedMap (tablesByCapacity) where each capacity level maps to a set of tables with that capacity. This method enables the findAvailableTable method to locate the smallest available table that fits a party’s size quickly.

```java
// Manages the collection of tables in the restaurant and their arrangement
public class Layout {
    private final Map<Integer, Table> tablesById = new HashMap<>();
    // Groups tables by their capacity for efficient table assignment, sorted from smallest to
    // largest capacity
    private final SortedMap<Integer, Set<Table>> tablesByCapacity = new TreeMap<>();

    public Layout(List<Integer> tableCapacities) {
        for (int i = 0; i < tableCapacities.size(); i++) {
            int capacity = tableCapacities.get(i);
            Table table = new Table(i, capacity);
            tablesById.put(i, table);
            tablesByCapacity.computeIfAbsent(capacity, k -> new HashSet<>()).add(table);
        }
    }

    // Finds the smallest available table that can accommodate a party of the given size at the
    // given time
    public Table findAvailableTable(int partySize, LocalDateTime reservationTime) {
        for (Set<Table> tables : tablesByCapacity.tailMap(partySize).values()) {
            for (Table table : tables) {
                if (table.isAvailableAt(reservationTime)) {
                    return table;
                }
            }
        }
        return null;
    }
}
```

**Implementation Choice:** We chose SortedMap structures for tablesByCapacity. This structure provides sorted key access that supports efficient range searches by capacity. This efficiency is crucial for the findAvailableTable method to match tables to party sizes. A basic Map lacks sorting capability. It would require additional logic to identify the smallest suitable table, making it less efficient.

Now that tables are arranged, let’s manage individual order items with OrderItem.

The class includes methods to update the order’s state:

- **sendToKitchen** changes the status from PENDING to SENT_TO_KITCHEN
- **deliverToCustomer** updates it from SENT_TO_KITCHEN to DELIVERED
- **cancel** sets it to CANCELED if not yet delivered

```java
// Represents a food item ordered by a customer with its current status in the order process
public class OrderItem {
    private final MenuItem item;
    private Status status = Status.PENDING;

    public OrderItem(MenuItem item) {
        this.item = item;
    }

    // Updates the status to indicate the item has been sent to the kitchen
    public void sendToKitchen() {
        if (status == Status.PENDING) status = Status.SENT_TO_KITCHEN;
    }

    // Updates the status to indicate the item has been delivered to the customer
    public void deliverToCustomer() {
        if (status == Status.SENT_TO_KITCHEN) status = Status.DELIVERED;
    }

    // Updates the status to indicate the item has been canceled
    public void cancel() {
        if (status == Status.PENDING || status == Status.SENT_TO_KITCHEN) {
            status = Status.CANCELED;
        }
    }

    // getter methods are omitted for brevity
}
```

With orders tracked, let’s oversee reservations through ReservationManager.

The ReservationManager class oversees all reservations in the restaurant, managing their scheduling, creation, and cancellation to ensure tables are assigned accurately. It serves as a central coordinator, connecting to the Layout class to locate available tables and storing Reservation objects to maintain booking details.

Here is the implementation of this class.

```java
// Manages all reservations for the restaurant and handles table assignments
public class ReservationManager {
    private final Layout layout;
    private final Set<Reservation> reservations = new HashSet<>();

    // Constructor that takes the restaurant's table layout
    public ReservationManager(Layout layout) {
        this.layout = layout;
    }

    // Finds potential time slots for a reservation within the given time range and party size
    public LocalDateTime[] findAvailableTimeSlots(
            LocalDateTime rangeStart, LocalDateTime rangeEnd, int partySize) {
        // checking every hour in the time range
        LocalDateTime current = rangeStart;
        List<LocalDateTime> possibleReservations = new ArrayList<>();
        while (!current.isAfter(rangeEnd)) {
            Table availableTable = layout.findAvailableTable(partySize, current);
            if (availableTable != null) {
                possibleReservations.add(current);
            }
            current = current.plusHours(1);
        }
        return possibleReservations.toArray(new LocalDateTime[0]);
    }

    // Creates a reservation for a specific time, party size and name
    public Reservation createReservation(
            String partyName, int partySize, LocalDateTime desiredTime) {
        desiredTime = desiredTime.truncatedTo(ChronoUnit.HOURS);
        Table table = layout.findAvailableTable(partySize, desiredTime);
        Reservation reservation = new Reservation(partyName, partySize, desiredTime, table);
        table.addReservation(reservation);
        reservations.add(reservation);
        return reservation;
    }

    // Removes an existing reservation
    public void removeReservation(
            String partyName, int partySize, LocalDateTime reservationTime) {
        // Find matching reservation before removing it
        for (Reservation reservation : new HashSet<>(reservations)) {
            if (reservation.getTime().equals(reservationTime)
                    && reservation.getPartySize() == partySize
                    && reservation.getPartyName().equals(partyName)) {
                // Clear the reservation from the table first
                Table table = reservation.getAssignedTable();
                table.removeReservation(reservationTime);
                // Then remove from the reservation collection
                reservations.remove(reservation);
                return;
            }
        }
    }
    // getter methods are omitted for brevity
}
```

- **findAvailableTimeSlots**: This method identifies available reservation times within a specified range. It examines each hour in the range, assuming a one-hour duration per reservation.
- **createReservation**: This method creates a reservation for a given time, party size, and party name. It uses Layout.findAvailableTable to confirm a table’s availability. If a table is found, it generates a new Reservation object, adds it to the reservations set, and updates the table’s booking status.
- **removeReservation**: This method cancels a reservation based on its time, party size, and party name. It searches the reservations set to locate the matching entry, removes it, and clears the table’s booking if found.

**Implementation Choice:** We chose a Set to store Reservation objects because its unique entry enforcement prevents duplicate bookings, aligning with the need to manage reservations accurately. An alternative could use a List, which allows simpler iteration but risks duplicates unless additional checks are added, or a Map with time-based keys, which could speed up lookups but complicate removal by requiring keys that combine multiple fields, like time, party size, and name, less suited for the system’s focus on reservation uniqueness.

Next, let’s define the reservation entries with Reservation.

The Reservation class is a simple, immutable entity class that stores essential reservation details, including the party name, number of people, reservation time, and assigned table. It serves as the foundational unit for the ReservationManager class, holding the data needed to manage bookings effectively.

```java
// Represents a reservation made at the restaurant for a specific party, time and table
public class Reservation {
    private final String partyName;
    private final int partySize;
    private final LocalDateTime time;
    private final Table assignedTable;

    public Reservation(
            String partyName, int partySize, LocalDateTime time, Table assignedTable) {
        this.partyName = partyName;
        this.partySize = partySize;
        this.time = time;
        this.assignedTable = assignedTable;
    }

    // getter methods are omitted for brevity
}
```

Finally, let’s unify these components in the Restaurant.

The Restaurant class acts as the central interface for the restaurant management system, offering methods to book reservations, seat walk-in parties, place orders, and compute bills. It follows the facade design pattern to unify these features, delegating reservation and walk-in seating tasks to ReservationManager, which uses Layout to find available tables, order placement, and billing to Table, which uses Menu to access items.

```java
// Main restaurant class that manages reservations, orders, and tables
public class Restaurant {
    private final String name;
    private final Menu menu;
    private final Layout layout;
    private final ReservationManager reservationManager;

    public Restaurant(String name, Menu menu, Layout layout) {
        this.name = name;
        this.menu = menu;
        this.layout = layout;
        this.reservationManager = new ReservationManager(layout);
    }

    // Finds possible reservation times within a time range for a party of specified size
    public LocalDateTime[] findAvailableTimeSlots(
            LocalDateTime rangeStart, LocalDateTime rangeEnd, int partySize) {
        return reservationManager.findAvailableTimeSlots(rangeStart, rangeEnd, partySize);
    }

    // Creates a reservation for a party at the specified time
    public Reservation createScheduledReservation(
            String partyName, int partySize, LocalDateTime time) {
        return reservationManager.createReservation(partyName, partySize, time);
    }

    // Removes an existing reservation
    public void removeReservation(
            String partyName, int partySize, LocalDateTime reservationTime) {
        reservationManager.removeReservation(partyName, partySize, reservationTime);
    }

    // Creates a reservation for a party without prior reservation
    public Reservation createWalkInReservation(String partyName, int partySize) {
        return reservationManager.createReservation(partyName, partySize, LocalDateTime.now());
    }

    // Adds an item to a table's order
    public void orderItem(Table table, MenuItem item) {
        table.addOrder(item);
    }

    // Removes an item from a table's order
    public void cancelItem(Table table, MenuItem item) {
        table.removeOrder(item);
    }

    // Calculates the bill amount for a table
    public BigDecimal calculateTableBill(Table table) {
        return table.calculateBillAmount();
    }

    // getter methods are omitted for brevity
}
```

- **Reservation methods**: The Restaurant class includes findAvailableTimeSlots to list available times, createScheduledReservation to book reservations, and removeReservation to cancel them, each delegating to ReservationManager for scheduling and management.
- **Walk-in seating**: The createWalkInReservation method assigns tables to walk-in parties, delegating to ReservationManager, which uses Layout to locate available tables.
- **Order management**: The orderItem method adds items to a table’s order, and cancelItem removes them, both delegating to Table methods addOrder and removeOrder for order processing.
- **Checkout**: The calculateTableBill method computes a table’s total cost, delegating to Table.calculateBillAmount for billing calculations.

**Implementation Choice:** We designed the Restaurant as a facade without its data structures. It delegates all operations to Menu, Layout, ReservationManager, and Table. This approach maintains a lightweight structure that simplifies system access. An alternative could have Restaurant store reservations or orders internally using a Map or List. That design would increase complexity and reduce modularity by centralizing responsibilities.

Having built the core system, let’s explore an enhancement in the deep dive to extend its capabilities.

## Deep Dive Topics

In this section, we’ll explore an enhancement to the Restaurant Management System by improving order handling during peak times. We’ll focus on adding a centralized order queue tracking mechanism to streamline kitchen coordination, ensure scalability, and maintain consistency with the system’s modular design.

### Order queue tracking

Consider a high-traffic scenario, such as a busy Friday evening at the restaurant, where a significant volume of orders is received, staff work diligently to communicate these to the kitchen, and cancellations accumulate. In the existing system, the Table class directly governs the status of OrderItem instances (e.g., through methods like sendToKitchen() and deliverToCustomer()). However, this decentralized structure lacks a cohesive overview of order progression across all tables. Consequently, staff face challenges in prioritizing time-sensitive orders, monitoring kitchen delays, or verifying cancellations without individually inspecting each table’s state. This approach introduces risks of inconsistency and undermines effective coordination during periods of elevated demand.

To address these limitations, we propose an enhancement by introducing a centralized OrderManager class responsible for queuing and processing order-related actions. Let’s take a closer look.

**Implementation steps:**

To implement this enhancement effectively, we’ll follow these steps:

**Step 1: Define a Command Interface for Order Actions**: The staff needs a consistent way to issue actions like sending an order to the kitchen or canceling it, improving reliability over direct calls. We define an interface called OrderCommand with a single method, execute(), which concrete classes will implement to perform their tasks.

Here’s the code for the OrderCommand interface:

```java
public interface OrderCommand {
    void execute();
}
```

**Step 2: Implement Concrete Command Classes**: To give staff a flexible way to manage distinct order actions and prepare them for centralized queuing, we build specific classes for each task, unlike the original system, where Table directly updated OrderItem statuses.

- The SendToKitchenCommand class takes an OrderItem and, when executed, calls sendToKitchen() to update its status to SENT_TO_KITCHEN.
- The DeliverCommand class uses deliverToCustomer() to change the OrderItem’s status to DELIVERED, signaling completion.
- The CancelCommand class invokes cancel() to set the status to CANCELED if the item hasn’t been delivered, marking it as voided.

Here’s the code for the action classes:

```java
// Command that handles sending order items to the Kitchen
public class SendToKitchenCommand implements OrderCommand {
    private final OrderItem orderItem;

    public SendToKitchenCommand(OrderItem orderItem) {
        this.orderItem = orderItem;
    }

    @Override
    public void execute() {
        orderItem.sendToKitchen();
    }
} // Command that handles delivery of order items

public class DeliverCommand implements OrderCommand {
    private final OrderItem orderItem;

    public DeliverCommand(OrderItem orderItem) {
        this.orderItem = orderItem;
    }

    @Override
    public void execute() {
        orderItem.deliverToCustomer();
    }
} // Command that handles cancellations of order items

public class CancelCommand implements OrderCommand {
    private final OrderItem orderItem;

    public CancelCommand(OrderItem orderItem) {
        this.orderItem = orderItem;
    }

    @Override
    public void execute() {
        orderItem.cancel();
    }
}
```

**Step 3: Introduce the OrderManager Class**: To handle these actions efficiently, we introduce an OrderManager class. This class maintains a list of OrderCommand objects, allowing us to add commands with addCommand() as orders are placed. The executeCommands() method processes all queued commands in sequence and clears the list afterward, ensuring orders are managed in an organized way without directly altering the Table’s OrderItems.

Here’s the code for the OrderManager class:

```java
public class OrderManager {
    private final List<OrderCommand> commandQueue = new ArrayList<>();

    // Adds a command to the queue for later execution
    public void addCommand(OrderCommand command) {
        commandQueue.add(command);
    }

    // Executes all commands in the queue and clears it
    public void executeCommands() {
        for (OrderCommand command : commandQueue) {
            command.execute();
        }
        commandQueue.clear();
    }
}
```

**Step 4: Integrate with the Restaurant Class**: To connect this system to staff actions, we update the Restaurant class to use OrderManager for order handling. When staff place an order, orderItem adds it to the table and queues a SendToKitchenCommand to send it to the kitchen. Similarly, cancelItem and deliverItem queue their respective commands, ensuring all actions flow through the centralized system for consistent tracking and execution.

Here’s the essential code for integrating OrderManager into the Restaurant:

```java
public class Restaurant {
    // ... fields unchanged ...
    private final OrderManager orderManager;

    public Restaurant(String name, Menu menu, Layout layout) {
        // ... fields unchanged ...
        this.orderManager = new OrderManager();
    }

    // Adds an item to a table's order and sends it to the kitchen
    public void orderItem(Table table, MenuItem item) {
        table.addOrder(item);
        // Get the last added order item
        List<OrderItem> orderItems = table.getOrderedItems().get(item);
        if (orderItems != null && !orderItems.isEmpty()) {
            OrderItem lastOrder = orderItems.get(orderItems.size() - 1);
            OrderCommand sendToKitchen = new SendToKitchenCommand(lastOrder);
            orderManager.addCommand(sendToKitchen);
            orderManager.executeCommands();
        }
    }

    // Removes an item from a table's order and cancels it
    public void cancelItem(Table table, MenuItem item) {
        List<OrderItem> orderItems = table.getOrderedItems().get(item);
        if (orderItems != null && !orderItems.isEmpty()) {
            OrderItem lastOrder = orderItems.get(orderItems.size() - 1);
            OrderCommand cancelOrder = new CancelCommand(lastOrder);
            orderManager.addCommand(cancelOrder);
            orderManager.executeCommands();
            table.removeOrder(item);
        }
    }

    // Delivers an item to the customer
    public void deliverItem(Table table, MenuItem item) {
        List<OrderItem> orderItems = table.getOrderedItems().get(item);
        if (orderItems != null && !orderItems.isEmpty()) {
            OrderItem lastOrder = orderItems.get(orderItems.size() - 1);
            OrderCommand deliverOrder = new DeliverCommand(lastOrder);
            orderManager.addCommand(deliverOrder);
            orderManager.executeCommands();
        }
    }
    // ... other methods unchanged ...
}
```

What we’ve just implemented follows a well-known software design pattern called the **Command Pattern**.

**Definition:** The Command is a behavioral design pattern that encapsulates a request as an independent object, containing all the details needed to carry it out. This encapsulation allows you to treat requests as parameters for methods, delay or schedule their execution.

In this pattern:

- **Command**: The OrderCommand interface and its implementations (SendToKitchenCommand, DeliverCommand, CancelCommand) define each action as an object, executed via execute().
- **Invoker**: The OrderManager class queues these command objects and triggers their execution, decoupling the Table from direct state changes.
- **Receiver**: The OrderItem class, with its existing Status enum and methods like sendToKitchen, receives and processes the commands, updating its state to reflect actions like preparation or delivery.

With our restaurant management system designed and implemented, let’s wrap up with key takeaways.

## Wrap Up

In this chapter, we gathered requirements for the Restaurant Management System through a series of detailed questions and answers. We then identified the core objects involved, designed the class structure, and implemented the key components of the system.

A key takeaway from this design is the importance of modularity and adherence to the single responsibility principle. Each component, such as the Menu, ReservationManager, Layout, and Table classes, manages a distinct responsibility, ensuring the system remains maintainable and adaptable for future enhancements.

Congratulations on getting this far! Now give yourself a pat on the back. Good job!
