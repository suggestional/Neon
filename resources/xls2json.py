import xlrd, json, os

workbook = xlrd.open_workbook(filename=r'data.xls')
table = workbook.sheets()[0]

# kana, japanese, class, chinese

row = 0
for book in range(4):
    os.mkdir("Book" + str(book))
    os.chdir("Book" + str(book))
    for unit in range(5):
        data = []
        for word in range(10):
            temp = {}
            temp['japanese'] = table.cell_value(row, 1)
            temp['chinese'] = table.cell_value(row, 3)
            temp['kana'] = table.cell_value(row, 0)
            temp['wordClass'] = table.cell_value(row, 2)
            data.append(temp)
            row += 1
        with open("Unit" + str(unit) + ".json", "w") as file:
            file.write(json.dumps(data))
    os.chdir("..")