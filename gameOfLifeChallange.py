
def gameOfLife(starting_state):
    """
        This function applies the game of life rules as laid out by John Conway.
        A very simple approach is taken to this challenge for the sake of readability over wow-factor.

        :type starting_state: List[List[int]]
        :rtype: List[List[int]] boards's next state
    """

    next_state = []
    for m in range(0, len(starting_state)):  # Iterate through each row
        next_state.append([])
        for n in range(0, len(starting_state[m])):  # Iterate through each element in the row

            # Neighbour counter used to apply rules of game
            nb_count = 0

            # Boolean variables used to make code more readable
            left_nb = n - 1 >= 0
            right_nb = n + 1 < len(starting_state[m])
            top_nb = m - 1 >= 0
            bottom_nb = m + 1 < len(starting_state)

            # Check if there is a left flank of neighbours. If so, check them for life
            if left_nb:
                nb_count = nb_count + starting_state[m][n - 1]

                # Check left-side diagonals
                if top_nb:
                    nb_count = nb_count + starting_state[m - 1][n - 1]
                if bottom_nb:
                    nb_count = nb_count + starting_state[m + 1][n - 1]

            # Check if there is a right flank of neighbours. If so, check them for life
            if right_nb:
                nb_count += starting_state[m][n + 1]

                # Check right-side diagonals
                if top_nb:
                    nb_count = nb_count + starting_state[m - 1][n + 1]
                if bottom_nb:
                    nb_count = nb_count + starting_state[m + 1][n + 1]

            # Check direct upper neighbour
            if top_nb:
                nb_count = nb_count + starting_state[m - 1][n]

            # Check direct bottom neighbour
            if bottom_nb:
                nb_count = nb_count + starting_state[m + 1][n]

            # Apply Conway's rules of life to cell using neighbour count
            if nb_count < 2 and starting_state[m][n] == 1:
                next_state[m].append(0)
            elif nb_count <= 3 and starting_state[m][n] == 1:
                next_state[m].append(1)
            elif nb_count > 3 and starting_state[m][n] == 1:
                next_state[m].append(0)
            elif nb_count == 3 and starting_state[m][n] == 0:
                next_state[m].append(1)
            else:
                next_state[m].append(0)

    return next_state


if __name__ == '__main__':

    # sample code to match request specs
    input1 = [[0, 0],[0, 0]]
    input2 = [[1, 0, 1], [1, 0, 1], [1, 0, 1]]
    input3 = [[1, 0, 1], [0, 0, 1], [0, 0, 0]]
    input4 = [[1, 0, 1], [0, 0, 0], [0, 1, 0]]

    input5 = [[1, 1], [1, 1]]
    input6 = [[0, 1, 0], [0, 1, 0], [0, 1, 0]]
    input7 = [[0, 1, 0], [0, 0, 1], [1, 1, 1]]
    input8 = [[0, 1, 0], [1, 1, 1], [1, 0, 1], [0, 1, 0]]

    print(gameOfLife(input1))
    print(gameOfLife(input2))
    print(gameOfLife(input3))
    print(gameOfLife(input4))
    print(gameOfLife(input5))
    print(gameOfLife(input6))
    print(gameOfLife(input7))
    print(gameOfLife(input8))
