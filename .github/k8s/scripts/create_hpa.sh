hpa_exists=false
kubectl get hpa | grep -v NAME | awk '{ print $1 }' > $hpas.dep
for i in `cat $hpas.dep`
do
  if [ "$i" == "$1" ]; then
    hpa_exists=true
    break
  fi
done

if [ "$hpa_exists" == false ]; then
  echo "creating hpa for $1"
  kubectl autoscale deployment $1 --cpu-percent=$2 --min=$3 --max=$4
else
  echo "hpa for $1 already exists"
fi