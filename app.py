from flask import Flask, request, jsonify, send_from_directory
import pandas as pd

app = Flask(__name__)

# Carregar dados do CSV
csv_file_path = 'musicas.csv'
df = pd.read_csv(csv_file_path, delimiter=';', encoding='latin1')

@app.route('/')
def index():
    return send_from_directory('templates', 'index.html')

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query')
    if not query:
        return jsonify({'error': 'Query parameter is required'}), 400

    # Filtrar o DataFrame com base na consulta
    results = df[df.apply(lambda row: query.lower() in row['titulo'].lower() or query.lower() in row['interprete'].lower(), axis=1)]

    # Converter o DataFrame filtrado para uma lista de dicionários
    results = results.to_dict(orient='records')

    return jsonify(results)

if __name__ == '__main__':
    # Configuração para rodar o Flask em todas as interfaces de rede e na porta 80
    app.run(host='0.0.0.0', port=80, debug=True)
